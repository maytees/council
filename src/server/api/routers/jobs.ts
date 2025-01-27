import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

const MAX_SHORT_DESC_LENGTH = 200; // 200 characters for short description

export const jobsRouter = createTRPCRouter({
    create: protectedProcedure
        .input(z.object({
            name: z.string(),
            shortDesc: z.string().max(MAX_SHORT_DESC_LENGTH),
            longDesc: z.string(),
            email: z.string().optional(),
            phone: z.string().optional(),
            website: z.string().optional(),
            applicationUrl: z.string(),
            schoolIds: z.array(z.string()),
        }))
        .mutation(async ({ ctx, input }) => {
            const company = await ctx.db.company.findFirst({
                where: { userId: ctx.session.user.id },
            });
            if (!company) throw new TRPCError({ code: "NOT_FOUND", message: "Company not found" });

            return ctx.db.$transaction(async (tx) => {
                const jobPost = await tx.jobPost.create({
                    data: {
                        name: input.name,
                        shortDesc: input.shortDesc,
                        longDesc: input.longDesc,
                        email: input.email,
                        phone: input.phone,
                        website: input.website,
                        applicationUrl: input.applicationUrl,
                        company: {
                            connect: {
                                id: company.id
                            }
                        },
                        approvalStatus: "PENDING",
                    },
                });

                await tx.schoolJobApproval.createMany({
                    data: input.schoolIds.map((schoolId) => ({
                        jobPostId: jobPost.id,
                        schoolId,
                        status: "PENDING",
                    })),
                });

                return jobPost;
            });
        }),

    getAll: publicProcedure
        .input(z.object({
            schoolId: z.string(),
        }))
        .query(async ({ ctx, input }) => {
            return ctx.db.jobPost.findMany({
                where: {
                    schoolApprovals: {
                        some: {
                            schoolId: input.schoolId,
                            status: "APPROVED",
                        },
                    },
                },
                include: {
                    company: true,
                },
            });
        }),

    getByCompany: publicProcedure
        .input(z.object({ companyId: z.string() }))
        .query(({ ctx, input }) => {
            return ctx.db.jobPost.findMany({
                where: {
                    companyId: input.companyId,
                },
                include: {
                    company: true,
                    schoolApprovals: true
                },
                orderBy: { createdAt: "desc" },
            });
        }),

    getById: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(({ ctx, input }) => {
            return ctx.db.jobPost.findUnique({
                where: { id: input.id },
                include: {
                    company: true,
                },
            });
        }),

    getMyJobs: protectedProcedure.query(({ ctx }) => {
        return ctx.db.jobPost.findMany({
            where: {
                company: {
                    userId: ctx.session.user.id,
                },
            },
            include: {
                company: {
                    select: {
                        name: true,
                        logo: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });
    }),

    updateApproval: protectedProcedure
        .input(z.object({
            jobPostId: z.string(),
            schoolId: z.string(),
            status: z.enum(['PENDING', 'APPROVED', 'DENIED']),
            denialReason: z.string().optional(),
        }))
        .mutation(async ({ ctx, input }) => {
            const school = await ctx.db.school.findFirst({
                where: {
                    id: input.schoolId,
                    counselors: {
                        some: {
                            id: ctx.session.user.id,
                        },
                    },
                },
            });

            if (!school) throw new TRPCError({ code: "UNAUTHORIZED", message: "Not authorized" });

            return ctx.db.$transaction(async (tx) => {
                await tx.schoolJobApproval.update({
                    where: {
                        jobPostId_schoolId: {
                            jobPostId: input.jobPostId,
                            schoolId: input.schoolId,
                        },
                    },
                    data: {
                        status: input.status,
                        denialReason: input.denialReason,
                    },
                });

                const approvedByAnySchool = await tx.schoolJobApproval.findFirst({
                    where: {
                        jobPostId: input.jobPostId,
                        status: 'APPROVED',
                    },
                });

                await tx.jobPost.update({
                    where: { id: input.jobPostId },
                    data: {
                        approvalStatus: approvedByAnySchool ? 'APPROVED' : input.status,
                    },
                });
            });
        }),

    getPendingJobs: protectedProcedure
        .input(z.object({
            schoolId: z.string(),
        }))
        .query(async ({ ctx, input }) => {
            const school = await ctx.db.school.findFirst({
                where: {
                    id: input.schoolId,
                    counselors: {
                        some: {
                            id: ctx.session.user.id,
                        },
                    },
                },
            });

            if (!school) throw new TRPCError({ code: "UNAUTHORIZED", message: "Not authorized" });

            return ctx.db.jobPost.findMany({
                where: {
                    schoolApprovals: {
                        some: {
                            schoolId: input.schoolId,
                            status: "PENDING",
                        },
                    },
                },
                include: {
                    company: true,
                    schoolApprovals: {
                        where: {
                            schoolId: input.schoolId,
                        },
                    },
                },
            });
        }),

    deleteJob: protectedProcedure
        .input(z.object({
            jobId: z.string(),
        }))
        .mutation(async ({ ctx, input }) => {
            // Check if the user owns the company that posted this job
            const job = await ctx.db.jobPost.findFirst({
                where: {
                    id: input.jobId,
                    company: {
                        userId: ctx.session.user.id,
                    },
                },
            });

            if (!job) throw new TRPCError({ code: "UNAUTHORIZED", message: "Not authorized to delete this job" });

            // Delete the job and all related approvals
            return ctx.db.$transaction(async (tx) => {
                // Delete all school approvals first
                await tx.schoolJobApproval.deleteMany({
                    where: { jobPostId: input.jobId },
                });

                // Then delete the job post
                return tx.jobPost.delete({
                    where: { id: input.jobId },
                });
            });
        }),
});