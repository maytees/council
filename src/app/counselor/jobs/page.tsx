import JobApprovalDashboard from "@/app/_components/dashboard/JobApprovalDashboard";
import { auth } from "@/server/auth";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

export default async function CounselorJobsPage() {
    const session = await auth();

    if (!session?.user) {
        return redirect("/auth/signin");
    }

    const user = await api.profile.get();

    if (!user?.profileCompleted) {
        return redirect("/profile/onboarding");
    }

    if (user.userType !== "COUNSELOR") {
        return redirect("/dashboard");
    }

    const counselorSchools = user.counselorAt;

    return (
        <main className="container mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8">
            <h1 className="text-3xl font-bold">Job Approval Dashboard</h1>
            {counselorSchools.map((school) => (
                <JobApprovalDashboard key={school.id} schoolId={school.id} schoolName={school.name} />
            ))}
        </main>
    );
} 