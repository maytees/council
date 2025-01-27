import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { api } from "@/trpc/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function JobPage({
    params: { id },
}: {
    params: { id: string };
}) {
    const job = await api.jobs.getById({ id });

    if (!job) {
        notFound();
    }

    return (
        <main className="container mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <div className="mb-8 flex items-center gap-6">
                        <Link href={`/company/${job.company.id}`}>
                            <Image
                                src={job.company.logo ?? "/defaulticon.jpg"}
                                alt={job.company.name}
                                width={80}
                                height={80}
                                className="rounded-full"
                            />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold">{job.name}</h1>
                            <Link
                                href={`/company/${job.company.id}`}
                                className="text-lg text-muted-foreground hover:underline"
                            >
                                {job.company.name}
                            </Link>
                        </div>
                    </div>

                    <section className="prose max-w-none dark:prose-invert">
                        <h2 className="text-2xl font-semibold">Job Description</h2>
                        <div className="whitespace-pre-wrap">{job.desc}</div>
                    </section>
                </div>

                <div className="space-y-6">
                    <Card className="p-6">
                        <h3 className="mb-6 text-lg font-semibold">Apply for this position</h3>
                        <Button asChild className="w-full">
                            <Link href={job.applicationUrl} target="_blank">
                                Apply Now
                            </Link>
                        </Button>
                    </Card>

                    <Card className="p-6">
                        <h3 className="mb-4 text-lg font-semibold">Contact Information</h3>
                        <dl className="space-y-4">
                            {job.email && (
                                <div>
                                    <dt className="text-sm text-muted-foreground">Email</dt>
                                    <dd>
                                        <a
                                            href={`mailto:${job.email}`}
                                            className="text-primary hover:underline"
                                        >
                                            {job.email}
                                        </a>
                                    </dd>
                                </div>
                            )}
                            {job.phone && (
                                <div>
                                    <dt className="text-sm text-muted-foreground">Phone</dt>
                                    <dd>
                                        <a
                                            href={`tel:${job.phone}`}
                                            className="text-primary hover:underline"
                                        >
                                            {job.phone}
                                        </a>
                                    </dd>
                                </div>
                            )}
                            {job.website && (
                                <div>
                                    <dt className="text-sm text-muted-foreground">Website</dt>
                                    <dd>
                                        <a
                                            href={job.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary hover:underline"
                                        >
                                            {job.website}
                                        </a>
                                    </dd>
                                </div>
                            )}
                        </dl>
                    </Card>

                    <Card className="p-6">
                        <h3 className="mb-4 text-lg font-semibold">About the Company</h3>
                        <p className="mb-4 text-muted-foreground">
                            {job.company.description}
                        </p>
                        <Button asChild variant="outline" className="w-full">
                            <Link href={`/company/${job.company.id}`}>View Company Profile</Link>
                        </Button>
                    </Card>
                </div>
            </div>
        </main>
    );
} 