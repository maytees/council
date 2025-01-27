import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

const userTypeSchema = z.enum(["STUDENT", "COUNSELOR", "COMPANY"], {
  errorMap: () => ({ message: "Please select a valid user type" }),
});

export const profileRouter = createTRPCRouter({
  update: protectedProcedure
    .input(
      z.object({
        userType: userTypeSchema,
        bio: z.string().optional(),
        schoolCode: z.string().optional(),
        school: z.string().optional(),
        position: z.string().optional(),
        company: z.string().optional(),
        location: z.string().optional(),
        skills: z.string().optional(),
        experience: z.string().optional(),
        education: z.string().optional(),
        description: z.string().optional(),
        website: z.string().optional(),
        industry: z.string().optional(),
        size: z.string().optional(),
        founded: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      // Update user profile
      await ctx.db.user.update({
        where: { id: userId },
        data: {
          userType: input.userType,
          bio: input.bio,
          schoolCode: input.schoolCode,
          position: input.position,
          location: input.location,
          skills: input.skills,
          experience: input.experience,
          education: input.education,
          profileCompleted: true,
        },
      });

      // If it's a company user, create or update company profile
      if (input.userType === "COMPANY" && input.company) {
        await ctx.db.company.upsert({
          where: { userId },
          create: {
            name: input.company,
            description: input.description ?? "",
            website: input.website ?? null,
            location: input.location ?? "",
            industry: input.industry ?? "",
            size: input.size ?? "",
            founded: input.founded ? parseInt(input.founded) : null,
            userId,
          },
          update: {
            name: input.company,
            description: input.description ?? "",
            website: input.website ?? null,
            location: input.location ?? "",
            industry: input.industry ?? "",
            size: input.size ?? "",
            founded: input.founded ? parseInt(input.founded) : null,
          },
        });
      }

      return { success: true };
    }),

  verifySchoolCode: protectedProcedure
    .input(
      z.object({
        schoolCode: z.string().length(6, { message: "School code must be exactly 6 characters" }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const school = await ctx.db.school.findUnique({
        where: {
          joinCode: input.schoolCode,
        },
      });

      if (!school) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Invalid school code. Please check and try again.",
        });
      }

      return true;
    }),

  get: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.db.user.findUnique({
        where: { id: ctx.session.user.id },
        include: {
          studentAt: true,
          company: true,
          ownedSchool: true,
          counselorAt: true,
        },
      });
    } catch (error) {
      if (error instanceof TRPCError) throw error;
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch profile. Please try again.",
      });
    }
  }),
});
