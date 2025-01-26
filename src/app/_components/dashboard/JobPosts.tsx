"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import Job, { type JobType } from "./Job";

const JobPosts = ({ jobs }: { jobs: JobType[] }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredJobs = jobs.filter((job) => {
    const searchText = searchQuery.toLowerCase();
    return (
      job.desc.toLowerCase().includes(searchText) ||
      job.name.toLowerCase().includes(searchText) ||
      job.company.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="mt-4 md:mt-10 flex flex-col items-start px-4 md:px-0 pr-10">
      <div className="flex w-full flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
        <h1 className="text-left text-xl md:text-2xl font-bold">Job postings</h1>
        <Input
          className="w-full md:w-2/3"
          placeholder="Search jobs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Separator className="my-4 md:my-5" />

      <div className="flex flex-col gap-4 overflow-y-auto w-full md:w-[40.5rem]">
        {filteredJobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full h-[16rem] gap-4 py-8 rounded-2xl border px-3 md:px-5">
            <p className="text-muted-foreground text-center">
              No jobs found matching your search criteria
            </p>
            {searchQuery && (
              <Button
                variant="outline"
                onClick={() => setSearchQuery("")}
              >
                Clear Search
              </Button>
            )}
          </div>
        ) : (
          filteredJobs.map((job, i) => (
            <div key={i} className="w-full">
              <Job
                company={job.company}
                desc={job.desc}
                name={job.name}
                icon={job.icon}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobPosts;
