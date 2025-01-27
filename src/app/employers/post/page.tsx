import { auth } from "@/server/auth";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";
import JobPost from "./JobPost";

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

  const jobs = await api.jobs.getMyJobs();

  const formattedJobs = jobs.map((job) => ({
    id: job.id,
    name: job.name,
    desc: job.desc,
    applicationUrl: job.applicationUrl,
    company: job.company.name,
    icon: job.company.logo ?? "/defaulticon.jpg",
  }));

  return (
    <div className="container mx-auto py-6">
      <JobPost formattedJobs={formattedJobs} />
    </div>
  );
};

export default PostJobPage;
