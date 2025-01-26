import { auth } from "@/server/auth";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";
import PostAJob from "./JobPost";

const PostJobPage = async () => {
  const session = await auth();

  if (!session?.user) {
    return redirect("/auth/signin");
  }

  const user = await api.profile.get();

  if (!user?.profileCompleted) {
    return redirect("/profile/onboarding");
  }

  if (user.userType !== "COMPANY") {
    return redirect("/dashboard");
  }

  return <PostAJob />;
};

export default PostJobPage;
