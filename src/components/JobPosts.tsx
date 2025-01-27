interface JobPostsProps {
    headerText: string;
    jobs: {
        id: string;
        name: string;
        shortDesc: string;
        applicationUrl: string;
        company: string;
        icon: string;
    }[];
    showDelete?: boolean;
    onDelete?: (jobId: string) => void;
}

const JobPosts: React.FC<JobPostsProps> = ({ headerText, jobs, showDelete, onDelete }) => {
    return (
        <div className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900">{headerText}</h2>
            <div className="space-y-6">
                {jobs.map((job) => (
                    <div
                        key={job.id}
                        className="relative flex items-start gap-4 rounded-lg border border-gray-200 p-4 hover:bg-gray-50"
                    >
                        <div className="h-12 w-12 flex-shrink-0">
                            <img
                                src={job.icon}
                                alt={`${job.company} logo`}
                                className="h-full w-full rounded-full object-cover"
                            />
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="text-sm font-medium text-gray-900">
                                <a
                                    href={job.applicationUrl}
                                    className="hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {job.name}
                                </a>
                            </div>
                            <p className="text-sm text-gray-500">{job.company}</p>
                            <p className="mt-1 text-sm text-gray-600">{job.shortDesc}</p>
                        </div>
                        {showDelete && onDelete && (
                            <button
                                onClick={() => onDelete(job.id)}
                                className="absolute right-4 top-4 text-gray-400 hover:text-red-500"
                                aria-label="Delete job"
                            >
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                </svg>
                            </button>
                        )}
                    </div>
                ))}
                {jobs.length === 0 && (
                    <p className="text-center text-gray-500">No jobs found</p>
                )}
            </div>
        </div>
    );
};

export default JobPosts;