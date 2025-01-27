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

const googleDesc = `
Google is seeking talented Software Engineering interns to join our dynamic teams in developing
innovative solutions that impact billions of users worldwide. You'll collaborate with world-class
engineers on real projects while gaining hands-on experience with our cutting-edge technologies
and agile development practices.
`;

const amazonDesc = `
Amazon is looking for innovative Software Development Engineer interns to help build the future of
technology. You'll work on large-scale systems that power Amazon's global infrastructure, gaining
invaluable experience in distributed systems, cloud computing, and agile methodologies while
working alongside industry leaders.
`;

const robloxDesc = `
Join Roblox as a Software Engineering intern and help shape the future of gaming and social
interaction. You'll work on cutting-edge technology that enables millions of users to connect,
create, and share experiences in our immersive platform while learning about game development,
scalable systems, and modern software architecture.
`;

const accentureDesc = `
Accenture is seeking motivated Software Engineering interns to join our technology consulting
practice. You'll work with diverse clients across industries, helping solve complex business
challenges through innovative technical solutions while gaining exposure to emerging technologies
and professional consulting skills.
`;

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    return redirect("/auth/signin");
  }

  const user = await api.profile.get();

  if (!user?.profileCompleted) {
    redirect("/profile/onboarding");
  }

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

            {/* <Avatar className="h-20 w-20">
              <AvatarImage src={user.image ?? ""} alt="profile" />
              <AvatarFallback>{user.name?.[0] ?? "U"}</AvatarFallback>
            </Avatar> */}
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
          jobs={[
            {
              company: "Google",
              desc: googleDesc,
              name: "Software Engineer Intern - Summer 2025",
              icon: "/googlelogo.jpg",
              id: "asdffff",
              applicationUrl: "https://google.com/jobs"
            },
            {
              company: "Amazon",
              desc: amazonDesc,
              name: "Software Development Engineer Intern - Summer 2025",
              icon: "/amazonlogo.webp",
              id: "asdfff",
              applicationUrl: "https://amazon.com/jobs"
            },
            {
              company: "Roblox",
              desc: robloxDesc,
              name: "Software Engineering Intern - Summer 2025",
              icon: "/robloxlogo.webp",
              id: "asdff",
              applicationUrl: "https://roblox.com/jobs"
            },
            {
              company: "Accenture",
              desc: accentureDesc,
              name: "Technology Consulting Intern - Summer 2025",
              icon: "/accenturelogo.png",
              id: "asdf",
              applicationUrl: "https://accenture.com/jobs"
            },
          ]}
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
