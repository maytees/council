import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const schoolRouter = createTRPCRouter({
    create: protectedProcedure
        .input(
            z.object({
                name: z.string().min(1).max(100),
                location: z.string().min(1).max(100),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            // Generate a random 6 character join code
            const joinCode = Math.random().toString(36).substring(2, 8).toUpperCase();

            return ctx.db.school.create({
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
        }),

    join: protectedProcedure
        .input(
            z.object(
                {
                    joinCode: z.string().length(6),
                    userType: z.string(),
                },
                {
                    invalid_type_error: "Invalid school code or user type",
                },
            ),
        )
        .mutation(async ({ ctx, input }) => {
            const school = await ctx.db.school.findUnique({
                where: {
                    joinCode: input.joinCode,
                },
            });

            if (!school) {
                throw new Error("Invalid school code");
            }

            // Convert userType to uppercase to match enum values
            const userType = input.userType.toUpperCase() as "STUDENT" | "COUNSELOR";

            // Update user's school and type using profile update mutation
            await ctx.db.user.update({
                where: {
                    id: ctx.session.user.id,
                },
                data: {
                    school: school.name,
                    userType: userType,
                    schoolCode: input.joinCode,
                },
            });

            // Then update the school relations
            if (userType === "STUDENT") {
                return ctx.db.school.update({
                    where: {
                        id: school.id,
                    },
                    data: {
                        students: {
                            connect: {
                                id: ctx.session.user.id,
                            },
                        },
                    },
                });
            } else if (userType === "COUNSELOR") {
                return ctx.db.school.update({
                    where: {
                        id: school.id,
                    },
                    data: {
                        counselors: {
                            connect: {
                                id: ctx.session.user.id,
                            },
                        },
                    },
                });
            }

            throw new Error(
                "Invalid user type - must be STUDENT or COUNSELOR"
            );
        }),

    getByCode: protectedProcedure
        .input(
            z.object({
                joinCode: z.string().length(6),
            }),
        )
        .query(async ({ ctx, input }) => {
            return ctx.db.school.findUnique({
                where: {
                    joinCode: input.joinCode,
                },
                include: {
                    students: true,
                    counselors: true,
                },
            });
        }),
});
