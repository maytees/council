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
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: {
          ...input,
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
    .input(z.object({ schoolCode: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const counselor = await ctx.db.user.findFirst({
        where: {
          userType: "COUNSELOR",
          schoolCode: input.schoolCode,
        },
      });

      if (!counselor) {
        throw new Error("Invalid school code");
      }

      return true;
    }),
}); 