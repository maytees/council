"use client";

import { type JobType } from "@/app/_components/dashboard/Job";
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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const MAX_TITLE_LENGTH = 100;
const MAX_DESC_LENGTH = 1000;
const MAX_URL_LENGTH = 200;

const PostAJob = () => {
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    email: "",
    phone: "",
    website: "",
    applicationUrl: "",
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setJobs([
        ...jobs,
        {
          ...formData,
          icon: "/defaulticon.jpg",
          company: "Guideway" // Will be modified by backend i guess
        },
      ]);

      setFormData({
        name: "",
        desc: "",
        email: "",
        phone: "",
        website: "",
        applicationUrl: "",
      });
    }
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 p-6 lg:flex-row">
      {/* Job Creation Form */}
      <div className="w-full lg:w-[500px]">
        <Card className="p-6">
          <h2 className="mb-6 text-2xl font-bold">Post a New Job</h2>
          <p>Please fill out each field in order to post your application</p>
          <Accordion type="single" collapsible className="w-full">
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
                  <div className="flex justify-end text-sm text-muted-foreground">
                    {formData.name.length}/{MAX_TITLE_LENGTH}
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
                  <div className="flex justify-end text-sm text-muted-foreground">
                    {formData.desc.length}/{MAX_DESC_LENGTH}
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
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Button onClick={handleSubmit} className="mt-6 w-full">
            Post job
          </Button>
          <p className="mt-1 text-sm font-light text-muted-foreground">Before your job is posted, it must be approved by school counselors.</p>
          {Object.keys(errors).length > 0 && (
            <p className="mt-1 text-sm text-red-500">Please fill in all required fields before submitting.</p>
          )}
        </Card>
      </div>

      {/* Job Listings */}
      <div className="flex-1">
        <h2 className="mb-4 text-2xl font-bold">Your Job Listings</h2>
        <Separator className="mb-6" />
        {/* <JobPosts jobs={jobs} /> */}
      </div>
    </div>
  );
};

export default PostAJob;
