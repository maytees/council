import { auth } from "@/server/auth";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";
import Onboarding from "./Onboarding";

const Page = async () => {
  const session = await auth();
  if (!session) {
    return redirect("/auth/signin");
  }

  const user = await api.profile.get();

  if (user?.profileCompleted) {
    return redirect("/dashboard");
  }

  return <Onboarding />;
};

export default Page;
