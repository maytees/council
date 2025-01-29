"use client";

import JobPosts from "@/app/_components/dashboard/JobPosts";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/react";
import { useState } from "react";

const MAX_TITLE_LENGTH = 100;
const MAX_SHORT_DESC_LENGTH = 200;
const MAX_LONG_DESC_LENGTH = 5000;
const MAX_URL_LENGTH = 200;

export interface JobPostProps {
  formattedJobs: {
    id: string;
    name: string;
    shortDesc: string;
    longDesc: string;
    applicationUrl: string;
    company: string;
    icon: string;
  }[];
}

const JobPost: React.FC<JobPostProps> = ({ formattedJobs: initialJobs }) => {
  const utils = api.useUtils();
  const { data: schools = [] } = api.school.getAll.useQuery();
  const [formattedJobs, setFormattedJobs] = useState(initialJobs);

  const createJob = api.jobs.create.useMutation({
    onMutate: async (newJob) => {
      await utils.jobs.getMyJobs.cancel();

      const optimisticJob = {
        id: "temp-" + Date.now(),
        name: newJob.name,
        shortDesc: newJob.shortDesc,
        longDesc: newJob.longDesc,
        applicationUrl: newJob.applicationUrl,
        company: "Your Company",
        icon: "/defaulticon.jpg",
      };

      setFormattedJobs((prev) => [...prev, optimisticJob]);

      return { optimisticJob };
    },
    onSuccess: async (result, variables, context) => {
      const companyData = await utils.company.getById.fetch({ id: result.companyId });

      setFormattedJobs((prev) =>
        prev.map((job) =>
          job.id === context?.optimisticJob.id ? {
            id: result.id,
            name: result.name,
            shortDesc: result.shortDesc,
            longDesc: result.longDesc,
            applicationUrl: result.applicationUrl,
            company: companyData?.name ?? "Your Company",
            icon: companyData?.logo ?? "/defaulticon.jpg",
          } : job
        )
      );

      setFormData({
        name: "",
        shortDesc: "",
        longDesc: "",
        email: "",
        phone: "",
        website: "",
        applicationUrl: "",
        schoolIds: [],
      });
    },
  });

  const [formData, setFormData] = useState({
    name: "",
    shortDesc: "",
    longDesc: "",
    email: "",
    phone: "",
    website: "",
    applicationUrl: "",
    schoolIds: [] as string[],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Job title is required";
    } else if (formData.name.length > MAX_TITLE_LENGTH) {
      newErrors.name = `Title must be ${MAX_TITLE_LENGTH} characters or less`;
    }

    if (!formData.shortDesc.trim()) {
      newErrors.shortDesc = "Short description is required";
    } else if (formData.shortDesc.length > MAX_SHORT_DESC_LENGTH) {
      newErrors.shortDesc = `Short description must be ${MAX_SHORT_DESC_LENGTH} characters or less`;
    }

    if (!formData.longDesc.trim()) {
      newErrors.longDesc = "Long description is required";
    } else if (formData.longDesc.length > MAX_LONG_DESC_LENGTH) {
      newErrors.longDesc = `Long description must be ${MAX_LONG_DESC_LENGTH} characters or less`;
    }

    if (!formData.email && !formData.phone && !formData.website) {
      newErrors.contact = "At least one contact method is required";
    }

    if (!formData.applicationUrl) {
      newErrors.applicationUrl = "Application URL is required";
    }

    if (formData.schoolIds.length === 0) {
      newErrors.schoolIds = "At least one school must be selected";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await createJob.mutateAsync(formData);
    } catch (error) {
      console.error("Failed to create job:", error);
    }
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 p-6 lg:flex-row">
      <Card className="p-6 h-fit">
        <CardTitle>Post a Job</CardTitle>
        <CardDescription>Posting a job will submit this application to counselors in selected schools. Counselors must approve the job before it is visible to students.</CardDescription>
        <form onSubmit={handleSubmit} className="space-y-2 mt-4">
          <Accordion type="single" collapsible>
            <AccordionItem value="job-details">
              <AccordionTrigger>Job Details</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Job Title</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={errors.name ? "border-red-500" : ""}
                      placeholder="e.g. Senior Software Engineer"
                      maxLength={MAX_TITLE_LENGTH}
                    />
                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                    <div className="flex justify-end text-sm text-muted-foreground">
                      {formData.name.length}/{MAX_TITLE_LENGTH}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="shortDesc">Short Description</Label>
                    <Textarea
                      id="shortDesc"
                      value={formData.shortDesc}
                      onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                      className={errors.shortDesc ? "border-red-500" : ""}
                      placeholder="Brief overview of the position (max 200 characters)"
                      maxLength={MAX_SHORT_DESC_LENGTH}
                    />
                    {errors.shortDesc && <p className="text-sm text-red-500">{errors.shortDesc}</p>}
                    <div className="flex justify-end text-sm text-muted-foreground">
                      {formData.shortDesc.length}/{MAX_SHORT_DESC_LENGTH}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="longDesc">Full Description (Markdown supported)</Label>
                    <Textarea
                      id="longDesc"
                      value={formData.longDesc}
                      onChange={(e) => setFormData({ ...formData, longDesc: e.target.value })}
                      className={errors.longDesc ? "border-red-500" : ""}
                      placeholder="Detailed job description with requirements, responsibilities, etc. Markdown formatting is supported."
                      rows={10}
                      maxLength={MAX_LONG_DESC_LENGTH}
                    />
                    {errors.longDesc && <p className="text-sm text-red-500">{errors.longDesc}</p>}
                    <div className="flex justify-end text-sm text-muted-foreground">
                      {formData.longDesc.length}/{MAX_LONG_DESC_LENGTH}
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="contact">
              <AccordionTrigger>Contact Information</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="contact@company.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      placeholder="https://company.com"
                    />
                  </div>
                  {errors.contact && <p className="text-sm text-red-500">{errors.contact}</p>}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="application-details">
              <AccordionTrigger>Application Details</AccordionTrigger>
              <AccordionContent>
                <div>
                  <Label htmlFor="applicationUrl">Application URL</Label>
                  <Input
                    id="applicationUrl"
                    type="url"
                    value={formData.applicationUrl}
                    onChange={(e) => setFormData({ ...formData, applicationUrl: e.target.value })}
                    className={errors.applicationUrl ? "border-red-500" : ""}
                    placeholder="https://company.com/careers/apply"
                    maxLength={MAX_URL_LENGTH}
                  />
                  {errors.applicationUrl && (
                    <p className="text-sm text-red-500">{errors.applicationUrl}</p>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div>
            <Label>Select Schools</Label>
            <div className="mt-2 space-y-2">
              {schools.map((school) => (
                <label key={school.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.schoolIds.includes(school.id)}
                    onChange={(e) => {
                      const newSchoolIds = e.target.checked
                        ? [...formData.schoolIds, school.id]
                        : formData.schoolIds.filter((id) => id !== school.id);
                      setFormData({ ...formData, schoolIds: newSchoolIds });
                    }}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <span>{school.name}</span>
                </label>
              ))}
            </div>
            {errors.schoolIds && (
              <p className="mt-1 text-sm text-red-500">{errors.schoolIds}</p>
            )}
          </div>

          {errors.submit && <p className="text-sm text-red-500">{errors.submit}</p>}

          <Button type="submit" className="w-full">
            Post Job
          </Button>
        </form>
      </Card>

      <div className="flex-1">
        <JobPosts
          headerText="Your Job Listings"
          jobs={formattedJobs}
          showDelete={true}
        />
      </div>
    </div>
  );
};

export default JobPost;
