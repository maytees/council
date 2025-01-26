import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const profileRouter = createTRPCRouter({
  update: protectedProcedure
    .input(
      z.object({
        userType: z.enum(["STUDENT", "COUNSELOR", "COMPANY"]),
        bio: z.string().optional(),
        schoolCode: z.string().optional(),
        school: z.string().optional(),
        position: z.string().optional(),
        company: z.string().optional(),
        location: z.string().optional(),
        skills: z.string().optional(),
        experience: z.string().optional(),
        education: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // First update the user type so the school join will work
      await ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: {
          userType: input.userType,
        },
      });

      // Then update the rest of the profile
      return ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: {
          bio: input.bio,
          schoolCode: input.schoolCode,
          school: input.school,
          position: input.position,
          company: input.company,
          location: input.location,
          skills: input.skills,
          experience: input.experience,
          education: input.education,
          profileCompleted: true,
        },
      });
    }),

  get: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
    });
  }),

  verifySchoolCode: protectedProcedure
    .input(z.object({ schoolCode: z.string().length(6, { message: "Invalid school code" }) }, { message: "Invalid school code", invalid_type_error: "Invalid school code" }))
    .mutation(async ({ ctx, input }) => {
      const school = await ctx.db.school.findUnique({
        where: {
          joinCode: input.schoolCode,
        },
      });

      if (!school) {
        throw new Error("Invalid school code");
      }

      return true;
    }),
});
