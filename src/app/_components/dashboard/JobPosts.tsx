"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import Job from "./Job";

type JobWithCompany = {
  id: string;
  name: string;
  shortDesc: string;
  applicationUrl: string;
  company: string;
  icon: string;
};

const JobPosts = ({
  jobs,
  headerText,
  showDelete = false,
  hideActions = false,
}: {
  jobs: JobWithCompany[];
  headerText?: string;
  showDelete?: boolean;
  hideActions?: boolean;
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredJobs = jobs.filter((job) => {
    const searchText = searchQuery.toLowerCase();
    return (
      job.shortDesc.toLowerCase().includes(searchText) ||
      job.name.toLowerCase().includes(searchText) ||
      job.company.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="flex h-[97vh] flex-col items-start pr-10">
      <div className="flex w-full flex-col items-start justify-between gap-4 md:flex-row md:items-center md:gap-0">
        <h1 className="text-left text-xl font-bold md:text-2xl">
          {headerText ?? "Job postings"}
        </h1>
        <Input
          className="w-full md:w-2/3"
          placeholder="Search jobs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Separator className="my-4 md:my-5" />

      <div className="flex w-full flex-col gap-4 overflow-y-auto md:w-[40.5rem]">
        {filteredJobs.length === 0 ? (
          <div className="flex h-[16rem] w-full flex-col items-center justify-center gap-4 rounded-2xl border px-3 py-8 md:px-5">
            <p className="text-center text-muted-foreground">
              No jobs found matching your search criteria
            </p>
            {searchQuery && (
              <Button variant="outline" onClick={() => setSearchQuery("")}>
                Clear Search
              </Button>
            )}
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div key={job.id} className="w-full">
              <Job
                id={job.id}
                company={job.company}
                shortDesc={job.shortDesc}
                name={job.name}
                icon={
                  job.company === "Google"
                    ? "/googlelogo.jpg"
                    : job.company === "Amazon"
                      ? "/amazonlogo.webp"
                      : job.company === "Roblox"
                        ? "/robloxlogo.webp"
                        : "/defaulticon.jpg"
                }
                applicationUrl={job.applicationUrl}
                showDelete={showDelete}
                hideActions={hideActions}
                onDelete={() => {
                  // Optionally handle local state update
                }}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobPosts;
