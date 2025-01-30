import JobPosts from "@/app/_components/dashboard/JobPosts";
import { Separator } from "@/components/ui/separator";
import { api } from "@/trpc/server";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function CompanyPage({
    params: { id },
}: {
    params: { id: string };
}) {
    const company = await api.company.getById({ id });
    const jobs = await api.jobs.getByCompany({ companyId: id });
    console.log(jobs, "is jobs")

    console.log(company, " is company")
    if (!company) {
        notFound();
    }

    const formattedJobs = jobs.map(job => ({
        id: job.id,
        name: job.name,
        shortDesc: job.shortDesc,
        longDesc: job.longDesc,
        applicationUrl: job.applicationUrl,
        company: company.name,
        icon: company.logo ?? "/defaulticon.jpg"
    }));

    return (
        <main className="container mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8">
            <div className="flex items-center gap-6">
                <Image
                    // src={company.logo ?? "/defaulticon.jpg"}
                    src={
                        company.name === "Google"
                            ? "/googlelogo.jpg"
                            : company.name === "Amazon"
                                ? "/amazonlogo.webp"
                                : company.name === "Roblox"
                                    ? "/robloxlogo.webp"
                                    : "/defaulticon.jpg"
                    }
                    alt={company.name}
                    width={120}
                    height={120}
                    className="rounded-full"
                />
                <div>
                    <h1 className="text-3xl font-bold">{company.name}</h1>
                    <p className="text-muted-foreground">{company.location}</p>
                </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <section>
                        <h2 className="mb-4 text-2xl font-semibold">About</h2>
                        <p className="text-muted-foreground">{company.description}</p>
                    </section>

                    <Separator className="my-10" />
                    <JobPosts headerText="Open Positions" jobs={formattedJobs} />
                </div>

                <div className="space-y-6 lg:col-span-1">
                    <div className="rounded-lg border p-6">
                        <h3 className="mb-4 text-lg font-semibold">Company Details</h3>
                        <dl className="space-y-4">
                            <div>
                                <dt className="text-sm text-muted-foreground">Industry</dt>
                                <dd>{company.industry}</dd>
                            </div>
                            <div>
                                <dt className="text-sm text-muted-foreground">Company size</dt>
                                <dd>{company.size}</dd>
                            </div>
                            <div>
                                <dt className="text-sm text-muted-foreground">Founded</dt>
                                <dd>{company.founded}</dd>
                            </div>
                            {company.website && (
                                <div>
                                    <dt className="text-sm text-muted-foreground">Website</dt>
                                    <dd>
                                        <a
                                            href={company.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary hover:underline"
                                        >
                                            {company.website}
                                        </a>
                                    </dd>
                                </div>
                            )}
                        </dl>
                    </div>
                </div>
            </div>
        </main>
    );
}