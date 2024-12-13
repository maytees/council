"use server";

import { signIn } from "@/server/auth";

export async function googleSignIn() {
  await signIn("google");
}

export async function resendSignIn(formData: FormData) {
  await signIn("resend", formData);
}
