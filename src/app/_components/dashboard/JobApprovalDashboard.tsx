import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/react";
import { useState } from "react";

export function JobApprovalDashboard({ schoolId }: { schoolId: string }) {
    const [denialReason, setDenialReason] = useState<string>("");
    const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

    const { data: pendingJobs, refetch } = api.jobs.getPendingJobs.useQuery({
        schoolId,
    });

    const approvalMutation = api.jobs.updateApproval.useMutation({
        onSuccess: () => {
            void refetch();
            setSelectedJobId(null);
            setDenialReason("");
        },
    });

    const handleApprove = (jobId: string) => {
        approvalMutation.mutate({
            jobPostId: jobId,
            schoolId,
            status: "APPROVED",
        });
    };

    const handleDeny = (jobId: string) => {
        if (!denialReason) return;
        approvalMutation.mutate({
            jobPostId: jobId,
            schoolId,
            status: "DENIED",
            denialReason,
        });
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Pending Job Approvals</h2>
            {pendingJobs?.map((job) => (
                <div key={job.id} className="rounded-lg border p-4">
                    <h3 className="text-xl font-semibold">{job.name}</h3>
                    <p className="text-gray-600">{job.company.name}</p>
                    <p className="mt-2">{job.desc}</p>

                    <div className="mt-4 flex gap-2">
                        <Button
                            onClick={() => handleApprove(job.id)}
                            variant="default"
                        >
                            Approve
                        </Button>

                        {selectedJobId === job.id ? (
                            <div className="space-y-2">
                                <Textarea
                                    placeholder="Reason for denial..."
                                    value={denialReason}
                                    onChange={(e) => setDenialReason(e.target.value)}
                                />
                                <Button
                                    onClick={() => handleDeny(job.id)}
                                    variant="destructive"
                                    disabled={!denialReason}
                                >
                                    Confirm Denial
                                </Button>
                                <Button
                                    onClick={() => {
                                        setSelectedJobId(null);
                                        setDenialReason("");
                                    }}
                                    variant="outline"
                                >
                                    Cancel
                                </Button>
                            </div>
                        ) : (
                            <Button
                                onClick={() => setSelectedJobId(job.id)}
                                variant="destructive"
                            >
                                Deny
                            </Button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
} 