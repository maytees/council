import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/server/auth";
import { api } from "@/trpc/server";
import { BookmarkPlus, Building2, Users } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import JobPosts from "../_components/dashboard/JobPosts";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    return redirect("/auth/signin");
  }

  const user = await api.profile.get();

  if (!user?.profileCompleted) {
    redirect("/profile/onboarding");
  }

  // Get the user's school ID if they are a student or counselor
  let schoolId = "";
  if (user.userType === "STUDENT" && user.studentAt?.[0]) {
    schoolId = user.studentAt[0].id;
  } else if (user.userType === "COUNSELOR" && user.counselorAt?.[0]) {
    schoolId = user.counselorAt[0].id;
  }

  // Fetch approved jobs for the user's school
  const jobs = schoolId ? await api.jobs.getAll({ schoolId }) : [];

  const formattedJobs = jobs.map((job) => ({
    id: job.id,
    name: job.name,
    desc: job.desc,
    applicationUrl: job.applicationUrl,
    company: job.company.name,
    icon: job.company.logo ?? "/defaulticon.jpg",
  }));

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 p-6 lg:h-screen lg:flex-row">
      {/* Left Sidebar - Profile Section */}
      <div className="flex w-full flex-col gap-6 lg:w-[280px]">
        <Card className="p-6">
          <div className="flex flex-col items-center gap-4">
            <Image
              className="h-20 w-20 rounded-full"
              width={80}
              height={80}
              src={session.user.image ?? "/defaulticon.jpg"}
              alt={session.user.name ?? session.user.id}
            />
            <div className="text-center">
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-sm text-muted-foreground">
                {user.userType === "COMPANY"
                  ? `${user.position} at ${user.company?.name}`
                  : user.userType === "COUNSELOR"
                    ? `Counselor at ${user.school}`
                    : `Student at ${user.school}`}
              </p>
            </div>
            <Button className="w-full" asChild>
              <a href="/profile">View Profile</a>
            </Button>
          </div>
          <Separator className="my-4" />
          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">About</p>
            <p className="text-sm">{user.bio ?? "No bio provided"}</p>
            {user.location && (
              <p className="text-sm text-muted-foreground">
                📍 {user.location}
              </p>
            )}
            {user.skills && (
              <div className="flex flex-wrap gap-1">
                {user.skills.split(",").map((skill) => (
                  <span key={skill} className="text-xs text-muted-foreground">
                    #{skill.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6 lg:block">
          <div className="mb-4 flex items-center gap-2">
            <Users className="h-5 w-5" />
            <h3 className="font-semibold">Connected Friends</h3>
          </div>
          <div className="flex flex-col gap-4">
            {["Alice Smith", "Bob Johnson", "Carol White"].map((friend) => (
              <div key={friend} className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{friend[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm">{friend}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <JobPosts
          headerText={user.userType === "COMPANY" ? "Your Job Listings" : "Available Jobs"}
          jobs={formattedJobs}
          showDelete={user.userType === "COMPANY"}
        />
      </div>

      {/* Right Sidebar */}
      <div className="flex w-full flex-col gap-6 lg:hidden xl:flex xl:w-[300px]">
        <Card className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <BookmarkPlus className="h-5 w-5" />
            <h3 className="font-semibold">Saved Jobs</h3>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { role: "Frontend Developer", company: "Microsoft" },
              { role: "Backend Engineer", company: "Meta" },
            ].map((job) => (
              <div key={job.role} className="flex flex-col gap-1">
                <p className="text-sm font-medium">{job.role}</p>
                <p className="text-xs text-muted-foreground">{job.company}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            <h3 className="font-semibold">Following Companies</h3>
          </div>
          <div className="flex flex-col gap-4">
            {["Apple", "Netflix", "Tesla"].map((company) => (
              <div key={company} className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{company[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm">{company}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
