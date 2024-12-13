import React from "react";
import VerifyRequest from "./VerifyRequest";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth();

  if (session?.user) {
    return redirect("/");
  }

  return <VerifyRequest />;
}
