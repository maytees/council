"use client";

import JobPosts from "@/app/_components/dashboard/JobPosts";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/react";
import { useState } from "react";

const MAX_TITLE_LENGTH = 100;
const MAX_DESC_LENGTH = 1000;
const MAX_URL_LENGTH = 200;

export interface JobPostProps {
  formattedJobs: {
    id: string;
    name: string;
    desc: string;
    applicationUrl: string;
    company: string;
    icon: string;
  }[];
}

const JobPost: React.FC<JobPostProps> = ({ formattedJobs }) => {
  const utils = api.useUtils();
  // const { data: myJobs = [] } = api.jobs.getMyJobs.useQuery();
  const { data: schools = [] } = api.school.getAll.useQuery();
  const createJob = api.jobs.create.useMutation({
    onSuccess: () => {
      setFormData({
        name: "",
        desc: "",
        email: "",
        phone: "",
        website: "",
        applicationUrl: "",
        schoolIds: [],
      });
      void utils.jobs.getMyJobs.invalidate();
    },
  });

  const [formData, setFormData] = useState({
    name: "",
    desc: "",
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

    if (!formData.desc.trim()) {
      newErrors.desc = "Job description is required";
    } else if (formData.desc.length > MAX_DESC_LENGTH) {
      newErrors.desc = `Description must be ${MAX_DESC_LENGTH} characters or less`;
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

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        await createJob.mutateAsync(formData);
      } catch (error) {
        const newErrors: Record<string, string> = {};

        if (error instanceof Error) {
          try {
            // Try to parse the error message as JSON
            const parsedErrors = JSON.parse(error.message) as Array<{ path?: string[], message: string }>;
            if (Array.isArray(parsedErrors)) {
              parsedErrors.forEach((err) => {
                const path = err.path?.[0];
                if (path) {
                  newErrors[path] = err.message;
                }
              });
            }
          } catch {
            // If not JSON, use the error message directly
            newErrors.submit = error.message;
          }
        }

        // If no specific errors were parsed, set a generic error
        if (Object.keys(newErrors).length === 0) {
          newErrors.submit = "Failed to create job post. Please try again.";
        }

        setErrors(newErrors);
      }
    }
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 p-6 lg:flex-row">
      {/* Job Creation Form */}
      <div className="w-full lg:w-[500px]">
        <Card className="p-6">
          <h2 className="mb-6 text-2xl font-bold">Post a New Job</h2>
          <p>Please fill out each field in order to post your application</p>
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="job-details">
              <AccordionTrigger>Job Details</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      setErrors({ ...errors, name: "" });
                    }}
                    placeholder="e.g. Senior Software Engineer"
                    maxLength={MAX_TITLE_LENGTH}
                  />
                  <div className="flex justify-between text-sm">
                    {errors.name && <span className="text-red-500">{errors.name}</span>}
                    <span className="text-muted-foreground">{formData.name.length}/{MAX_TITLE_LENGTH}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Job Description</Label>
                  <Textarea
                    id="description"
                    value={formData.desc}
                    onChange={(e) => {
                      setFormData({ ...formData, desc: e.target.value });
                      setErrors({ ...errors, desc: "" });
                    }}
                    placeholder="Describe the role, requirements, and responsibilities..."
                    className="min-h-[200px]"
                    maxLength={MAX_DESC_LENGTH}
                  />
                  <div className="flex justify-between text-sm">
                    {errors.desc && <span className="text-red-500">{errors.desc}</span>}
                    <span className="text-muted-foreground">{formData.desc.length}/{MAX_DESC_LENGTH}</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="contact-info">
              <AccordionTrigger>Contact Information</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        setErrors({ ...errors, contact: "" });
                      }}
                      placeholder="contact@company.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        setErrors({ ...errors, contact: "" });
                      }}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Company Website</Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) => {
                        setFormData({ ...formData, website: e.target.value });
                        setErrors({ ...errors, contact: "" });
                      }}
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
                <div className="space-y-2">
                  <Label htmlFor="applicationUrl">Application URL</Label>
                  <Input
                    id="applicationUrl"
                    type="url"
                    value={formData.applicationUrl}
                    onChange={(e) => {
                      setFormData({ ...formData, applicationUrl: e.target.value });
                      setErrors({ ...errors, applicationUrl: "" });
                    }}
                    placeholder="https://company.com/careers/apply"
                    maxLength={MAX_URL_LENGTH}
                  />
                  {errors.applicationUrl && <p className="text-sm text-red-500">{errors.applicationUrl}</p>}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="schools">
              <AccordionTrigger>Target Schools</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <Label>Select Schools</Label>
                  <div className="space-y-2">
                    {schools.map((school) => (
                      <div key={school.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={school.id}
                          checked={formData.schoolIds.includes(school.id)}
                          onChange={(e) => {
                            const newSchoolIds = e.target.checked
                              ? [...formData.schoolIds, school.id]
                              : formData.schoolIds.filter(id => id !== school.id);
                            setFormData({ ...formData, schoolIds: newSchoolIds });
                            setErrors({ ...errors, schoolIds: "" });
                          }}
                        />
                        <Label htmlFor={school.id}>{school.name}</Label>
                      </div>
                    ))}
                  </div>
                  {errors.schoolIds && <p className="text-sm text-red-500">{errors.schoolIds}</p>}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Button onClick={handleSubmit} className="mt-6 w-full">
            Post job
          </Button>
          <p className="mt-1 text-sm font-light text-muted-foreground">Before your job is posted, it must be approved by school counselors.</p>
          {errors.submit && (
            <p className="mt-1 text-sm text-red-500">{errors.submit}</p>
          )}
        </Card>
      </div>

      {/* Job Listings */}
      <div className="flex-1">
        <JobPosts headerText="Your Job Listings" jobs={formattedJobs} showDelete={true} />
      </div>
    </div>
  );
};

export default JobPost;
