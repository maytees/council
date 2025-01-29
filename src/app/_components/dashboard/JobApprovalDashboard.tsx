"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { api } from "@/trpc/react";
import { Check, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type JobApprovalProps = {
    schoolId: string;
    schoolName: string;
};

const JobApprovalDashboard = ({ schoolId, schoolName }: JobApprovalProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    const { data: pendingJobs = [] } = api.jobs.getPendingJobs.useQuery({ schoolId });
    const utils = api.useUtils();

    const updateApproval = api.jobs.updateApproval.useMutation({
        onSuccess: () => {
            void utils.jobs.getPendingJobs.invalidate({ schoolId });
        },
    });

    const handleApproval = async (jobId: string, status: 'APPROVED' | 'DENIED') => {
        await updateApproval.mutateAsync({
            jobPostId: jobId,
            schoolId,
            status,
        });
    };

    const filteredJobs = pendingJobs.filter((job) => {
        const searchText = searchQuery.toLowerCase();
        return (
            job.shortDesc.toLowerCase().includes(searchText) ||
            job.name.toLowerCase().includes(searchText) ||
            job.company.name.toLowerCase().includes(searchText)
        );
    });

    return (
        <Card className="p-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">{schoolName}</h2>
                <Input
                    className="w-64"
                    placeholder="Search jobs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <Separator className="my-4" />
            {filteredJobs.length === 0 ? (
                <p className="text-center text-muted-foreground">No pending jobs to review</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredJobs.map((job) => (
                        <div key={job.id} className="flex flex-col gap-4 rounded-lg border p-4">
                            <div className="flex items-start justify-between">
                                <div className="flex gap-4">
                                    <Link href={`/company/${job.company.id}`}>
                                        <Image
                                            src={
                                                job.company.name === "Google"
                                                    ? "/googlelogo.jpg"
                                                    : job.company.name === "Amazon"
                                                        ? "/amazonlogo.webp"
                                                        : job.company.name === "Roblox"
                                                            ? "/robloxlogo.webp"
                                                            : "/defaulticon.jpg"
                                            }
                                            alt={job.company.name}
                                            width={50}
                                            height={50}
                                            className="rounded-full"
                                        />
                                    </Link>
                                    <div>
                                        <Link href={`/jobs/${job.id}`} className="hover:underline">
                                            <h3 className="text-xl font-semibold">{job.name}</h3>
                                        </Link>
                                        <Link href={`/company/${job.company.id}`} className="hover:underline">
                                            <p className="text-muted-foreground">{job.company.name}</p>
                                        </Link>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleApproval(job.id, 'APPROVED')}
                                        className="text-green-600 hover:bg-green-100 hover:text-green-700"
                                    >
                                        <Check className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleApproval(job.id, 'DENIED')}
                                        className="text-red-600 hover:bg-red-100 hover:text-red-700"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <p className="text-sm">{job.shortDesc}</p>
                        </div>
                    ))}
                </div>
            )}
        </Card>
    );
};

export default JobApprovalDashboard;