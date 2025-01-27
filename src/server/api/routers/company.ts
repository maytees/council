import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

const companySchema = z.object({
    name: z.string().min(1, { message: "Company name is required" }),
    description: z.string().min(1, { message: "Company description is required" }),
    website: z.string().url({ message: "Please enter a valid website URL" }).optional(),
    location: z.string().min(1, { message: "Location is required" }),
    industry: z.string().min(1, { message: "Industry is required" }),
    size: z.string().min(1, { message: "Company size is required" }),
    founded: z.number().optional(),
});

export const companyRouter = createTRPCRouter({
    create: protectedProcedure
        .input(companySchema)
        .mutation(async ({ ctx, input }) => {
            try {
                const existingCompany = await ctx.db.company.findFirst({
                    where: { userId: ctx.session.user.id },
                });

                if (existingCompany) {
                    throw new TRPCError({
                        code: "BAD_REQUEST",
                        message: "You already have a company profile",
                    });
                }

                return await ctx.db.company.create({
                    data: {
                        ...input,
                        userId: ctx.session.user.id,
                    },
                });
            } catch (error) {
                if (error instanceof TRPCError) throw error;
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Failed to create company profile. Please try again.",
                });
            }
        }),

    update: protectedProcedure
        .input(companySchema)
        .mutation(async ({ ctx, input }) => {
            try {
                const company = await ctx.db.company.findFirst({
                    where: { userId: ctx.session.user.id },
                });

                if (!company) {
                    // If company doesn't exist, create it
                    return await ctx.db.company.create({
                        data: {
                            ...input,
                            userId: ctx.session.user.id,
                        },
                    });
                }

                // Otherwise update existing company
                return await ctx.db.company.update({
                    where: { id: company.id },
                    data: input,
                });
            } catch (error) {
                if (error instanceof TRPCError) throw error;
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Failed to update company profile. Please try again.",
                });
            }
        }),

    getById: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            try {
                const company = await ctx.db.company.findUnique({
                    where: { id: input.id },
                });

                if (!company) {
                    throw new TRPCError({
                        code: "NOT_FOUND",
                        message: "Company not found",
                    });
                }

                return company;
            } catch (error) {
                if (error instanceof TRPCError) throw error;
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Failed to fetch company information. Please try again.",
                });
            }
        }),

    getByUser: protectedProcedure.query(async ({ ctx }) => {
        try {
            const company = await ctx.db.company.findFirst({
                where: { userId: ctx.session.user.id },
            });

            if (!company) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Company profile not found",
                });
            }

            return company;
        } catch (error) {
            if (error instanceof TRPCError) throw error;
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Failed to fetch company profile. Please try again.",
            });
        }
    }),
}); 