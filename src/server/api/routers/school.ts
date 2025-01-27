import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

const schoolSchema = z.object({
    name: z.string().min(1, { message: "School name is required" }).max(100, { message: "School name must be 100 characters or less" }),
    location: z.string().min(1, { message: "Location is required" }).max(100, { message: "Location must be 100 characters or less" }),
});

export const schoolRouter = createTRPCRouter({
    create: protectedProcedure
        .input(schoolSchema)
        .mutation(async ({ ctx, input }) => {
            try {
                const joinCode = Math.random().toString(36).substring(2, 8).toUpperCase();

                return await ctx.db.school.create({
                    data: {
                        name: input.name,
                        location: input.location,
                        joinCode,
                        owner: {
                            connect: {
                                id: ctx.session.user.id,
                            },
                        },
                        counselors: {
                            connect: {
                                id: ctx.session.user.id,
                            },
                        },
                    },
                });
            } catch (error) {
                if (error instanceof Error && error.message.includes("Unique constraint")) {
                    throw new TRPCError({
                        code: "CONFLICT",
                        message: "A school with this name already exists. Please choose a different name.",
                    });
                }
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Failed to create school. Please try again.",
                });
            }
        }),

    join: protectedProcedure
        .input(
            z.object({
                joinCode: z.string().length(6, { message: "Join code must be exactly 6 characters" }),
                userType: z.string({
                    required_error: "User type is required",
                    invalid_type_error: "Invalid user type",
                }),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            try {
                const school = await ctx.db.school.findUnique({
                    where: {
                        joinCode: input.joinCode,
                    },
                });

                if (!school) {
                    throw new TRPCError({
                        code: "NOT_FOUND",
                        message: "Invalid school code. Please check and try again.",
                    });
                }

                const userType = input.userType.toUpperCase();
                if (!["STUDENT", "COUNSELOR"].includes(userType)) {
                    throw new TRPCError({
                        code: "BAD_REQUEST",
                        message: "Invalid user type - must be Student or Counselor",
                    });
                }

                // Update user's school and type
                await ctx.db.user.update({
                    where: {
                        id: ctx.session.user.id,
                    },
                    data: {
                        school: school.name,
                        userType: userType as "STUDENT" | "COUNSELOR",
                        schoolCode: input.joinCode,
                    },
                });

                // Update school relations
                return await ctx.db.school.update({
                    where: {
                        id: school.id,
                    },
                    data: {
                        [userType === "STUDENT" ? "students" : "counselors"]: {
                            connect: {
                                id: ctx.session.user.id,
                            },
                        },
                    },
                });
            } catch (error) {
                if (error instanceof TRPCError) throw error;
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Failed to join school. Please try again.",
                });
            }
        }),

    getByCode: protectedProcedure
        .input(
            z.object({
                joinCode: z.string().length(6, { message: "Join code must be exactly 6 characters" }),
            }),
        )
        .query(async ({ ctx, input }) => {
            try {
                const school = await ctx.db.school.findUnique({
                    where: {
                        joinCode: input.joinCode,
                    },
                    include: {
                        students: true,
                        counselors: true,
                    },
                });

                if (!school) {
                    throw new TRPCError({
                        code: "NOT_FOUND",
                        message: "School not found. Please check the join code.",
                    });
                }

                return school;
            } catch (error) {
                if (error instanceof TRPCError) throw error;
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Failed to fetch school information. Please try again.",
                });
            }
        }),

    getById: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            try {
                const school = await ctx.db.school.findUnique({
                    where: { id: input.id },
                    include: {
                        students: true,
                        counselors: true,
                    },
                });

                if (!school) {
                    throw new TRPCError({
                        code: "NOT_FOUND",
                        message: "School not found",
                    });
                }

                return school;
            } catch (error) {
                if (error instanceof TRPCError) throw error;
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Failed to fetch school information. Please try again.",
                });
            }
        }),

    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.db.school.findMany({
            select: {
                id: true,
                name: true,
            },
        });
    }),
});
