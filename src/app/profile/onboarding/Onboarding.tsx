"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

const MAX_BIO_LENGTH = 500;
const MAX_SCHOOL_LENGTH = 100;
const MAX_COMPANY_LENGTH = 100;
const MAX_POSITION_LENGTH = 100;
const MAX_LOCATION_LENGTH = 100;
const MAX_SKILLS_LENGTH = 200;
const MAX_EXPERIENCE_LENGTH = 50;
const MAX_EDUCATION_LENGTH = 200;

const steps = [
  {
    id: "user-type",
    title: "I am a...",
    description: "Let us know what type of user you are",
  },
  {
    id: "basic-info",
    title: "Basic Information", 
    description: "Tell us a bit about yourself",
  },
  {
    id: "additional-info",
    title: "Additional Details",
    description: "Help us personalize your experience",
  },
];

const Onboarding = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    userType: "",
    bio: "",
    schoolCode: "",
    school: "",
    position: "",
    company: "",
    location: "",
    skills: "",
    experience: "",
    education: "",
    isNewSchool: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateProfile = api.profile.update.useMutation({
    onSuccess: () => {
      router.push("/dashboard");
    },
  });

  const validateStep = () => {
    const newErrors: Record<string, string> = {};

    switch (currentStep) {
      case 0:
        if (!formData.userType) {
          newErrors.userType = "Please select a user type";
        }
        break;
      case 1:
        if (!formData.bio.trim()) {
          newErrors.bio = "Bio is required";
        } else if (formData.bio.length > MAX_BIO_LENGTH) {
          newErrors.bio = `Bio must be ${MAX_BIO_LENGTH} characters or less`;
        }
        if (formData.userType === "STUDENT") {
          if (!formData.schoolCode.trim()) {
            newErrors.schoolCode = "School code is required";
          }
        }
        if (formData.userType === "COUNSELOR") {
          if (!formData.schoolCode.trim() && !formData.school.trim()) {
            newErrors.schoolCode = "Either school code or new school name is required";
          }
          if (formData.school.trim() && formData.school.length > MAX_SCHOOL_LENGTH) {
            newErrors.school = `School name must be ${MAX_SCHOOL_LENGTH} characters or less`;
          }
        }
        if (formData.userType === "COMPANY") {
          if (!formData.company.trim()) {
            newErrors.company = "Company name is required";
          } else if (formData.company.length > MAX_COMPANY_LENGTH) {
            newErrors.company = `Company name must be ${MAX_COMPANY_LENGTH} characters or less`;
          }
          if (!formData.position.trim()) {
            newErrors.position = "Position is required";
          } else if (formData.position.length > MAX_POSITION_LENGTH) {
            newErrors.position = `Position must be ${MAX_POSITION_LENGTH} characters or less`;
          }
        }
        break;
      case 2:
        if (!formData.location.trim()) {
          newErrors.location = "Location is required";
        } else if (formData.location.length > MAX_LOCATION_LENGTH) {
          newErrors.location = `Location must be ${MAX_LOCATION_LENGTH} characters or less`;
        }
        if (!formData.skills.trim()) {
          newErrors.skills = "Skills are required";
        } else if (formData.skills.length > MAX_SKILLS_LENGTH) {
          newErrors.skills = `Skills must be ${MAX_SKILLS_LENGTH} characters or less`;
        }
        if (!formData.experience.trim()) {
          newErrors.experience = "Experience is required";
        } else if (formData.experience.length > MAX_EXPERIENCE_LENGTH) {
          newErrors.experience = `Experience must be ${MAX_EXPERIENCE_LENGTH} characters or less`;
        }
        if (!formData.education.trim()) {
          newErrors.education = "Education details are required";
        } else if (formData.education.length > MAX_EDUCATION_LENGTH) {
          newErrors.education = `Education must be ${MAX_EDUCATION_LENGTH} characters or less`;
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateStep()) {
      updateProfile.mutate({
        userType: formData.userType as "STUDENT" | "COUNSELOR" | "COMPANY",
        bio: formData.bio,
        schoolCode: formData.schoolCode,
        school: formData.school,
        position: formData.position,
        company: formData.company,
        location: formData.location,
        skills: formData.skills,
        experience: formData.experience,
        education: formData.education,
      });
    }
  };

  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            key="step-0"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
          >
            <RadioGroup
              value={formData.userType}
              onValueChange={(value) => {
                setFormData({ ...formData, userType: value });
                setErrors({ ...errors, userType: "" });
              }}
              className="flex flex-col gap-6"
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="STUDENT" id="student" />
                <Label htmlFor="student" className="text-lg">Student</Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="COUNSELOR" id="counselor" />
                <Label htmlFor="counselor" className="text-lg">Counselor</Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="COMPANY" id="company" />
                <Label htmlFor="company" className="text-lg">Company</Label>
              </div>
            </RadioGroup>
            {errors.userType && (
              <p className="mt-2 text-sm text-red-500">{errors.userType}</p>
            )}
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            key="step-1"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div className="space-y-3">
              <Label htmlFor="bio" className="text-lg">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => {
                  setFormData({ ...formData, bio: e.target.value });
                  setErrors({ ...errors, bio: "" });
                }}
                placeholder="Tell us about yourself..."
                className="min-h-[120px] text-lg"
                maxLength={MAX_BIO_LENGTH}
              />
              <div className="flex justify-end text-sm text-muted-foreground">
                {formData.bio.length}/{MAX_BIO_LENGTH}
              </div>
              {errors.bio && (
                <p className="text-sm text-red-500">{errors.bio}</p>
              )}
            </div>

            {formData.userType === "STUDENT" && (
              <div className="space-y-3">
                <Label htmlFor="schoolCode" className="text-lg">School Code</Label>
                <Input
                  id="schoolCode"
                  value={formData.schoolCode}
                  onChange={(e) => {
                    setFormData({ ...formData, schoolCode: e.target.value });
                    setErrors({ ...errors, schoolCode: "" });
                  }}
                  placeholder="Enter your school code"
                  className="text-lg"
                />
                {errors.schoolCode && (
                  <p className="text-sm text-red-500">{errors.schoolCode}</p>
                )}
              </div>
            )}

            {formData.userType === "COUNSELOR" && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="schoolCode" className="text-lg">School Code</Label>
                  <Input
                    id="schoolCode"
                    value={formData.schoolCode}
                    onChange={(e) => {
                      setFormData({ 
                        ...formData, 
                        schoolCode: e.target.value,
                        isNewSchool: false 
                      });
                      setErrors({ ...errors, schoolCode: "" });
                    }}
                    placeholder="Enter existing school code"
                    className="text-lg"
                    disabled={formData.isNewSchool}
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="newSchool"
                    checked={formData.isNewSchool}
                    onChange={(e) => {
                      setFormData({ 
                        ...formData, 
                        isNewSchool: e.target.checked,
                        schoolCode: e.target.checked ? "" : formData.schoolCode 
                      });
                    }}
                  />
                  <Label htmlFor="newSchool">Register new school</Label>
                </div>

                {formData.isNewSchool && (
                  <div className="space-y-3">
                    <Label htmlFor="school" className="text-lg">School Name</Label>
                    <Input
                      id="school"
                      value={formData.school}
                      onChange={(e) => {
                        setFormData({ ...formData, school: e.target.value });
                        setErrors({ ...errors, school: "" });
                      }}
                      placeholder="Enter new school name"
                      className="text-lg"
                      maxLength={MAX_SCHOOL_LENGTH}
                    />
                    <div className="flex justify-end text-sm text-muted-foreground">
                      {formData.school.length}/{MAX_SCHOOL_LENGTH}
                    </div>
                  </div>
                )}
                {errors.schoolCode && (
                  <p className="text-sm text-red-500">{errors.schoolCode}</p>
                )}
                {errors.school && (
                  <p className="text-sm text-red-500">{errors.school}</p>
                )}
              </div>
            )}

            {formData.userType === "COMPANY" && (
              <>
                <div className="space-y-3">
                  <Label htmlFor="company" className="text-lg">Company Name</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => {
                      setFormData({ ...formData, company: e.target.value });
                      setErrors({ ...errors, company: "" });
                    }}
                    placeholder="Your company name"
                    className="text-lg"
                    maxLength={MAX_COMPANY_LENGTH}
                  />
                  <div className="flex justify-end text-sm text-muted-foreground">
                    {formData.company.length}/{MAX_COMPANY_LENGTH}
                  </div>
                  {errors.company && (
                    <p className="text-sm text-red-500">{errors.company}</p>
                  )}
                </div>
                <div className="space-y-3">
                  <Label htmlFor="position" className="text-lg">Position</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => {
                      setFormData({ ...formData, position: e.target.value });
                      setErrors({ ...errors, position: "" });
                    }}
                    placeholder="Your position"
                    className="text-lg"
                    maxLength={MAX_POSITION_LENGTH}
                  />
                  <div className="flex justify-end text-sm text-muted-foreground">
                    {formData.position.length}/{MAX_POSITION_LENGTH}
                  </div>
                  {errors.position && (
                    <p className="text-sm text-red-500">{errors.position}</p>
                  )}
                </div>
              </>
            )}
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step-2"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div className="space-y-3">
              <Label htmlFor="location" className="text-lg">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => {
                  setFormData({ ...formData, location: e.target.value });
                  setErrors({ ...errors, location: "" });
                }}
                placeholder="Your location"
                className="text-lg"
                maxLength={MAX_LOCATION_LENGTH}
              />
              <div className="flex justify-end text-sm text-muted-foreground">
                {formData.location.length}/{MAX_LOCATION_LENGTH}
              </div>
              {errors.location && (
                <p className="text-sm text-red-500">{errors.location}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="skills" className="text-lg">Skills</Label>
              <Input
                id="skills"
                value={formData.skills}
                onChange={(e) => {
                  setFormData({ ...formData, skills: e.target.value });
                  setErrors({ ...errors, skills: "" });
                }}
                placeholder="Your skills (comma separated)"
                className="text-lg"
                maxLength={MAX_SKILLS_LENGTH}
              />
              <div className="flex justify-end text-sm text-muted-foreground">
                {formData.skills.length}/{MAX_SKILLS_LENGTH}
              </div>
              {errors.skills && (
                <p className="text-sm text-red-500">{errors.skills}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="experience" className="text-lg">Experience</Label>
              <Input
                id="experience"
                value={formData.experience}
                onChange={(e) => {
                  setFormData({ ...formData, experience: e.target.value });
                  setErrors({ ...errors, experience: "" });
                }}
                placeholder="Years of experience"
                className="text-lg"
                maxLength={MAX_EXPERIENCE_LENGTH}
              />
              <div className="flex justify-end text-sm text-muted-foreground">
                {formData.experience.length}/{MAX_EXPERIENCE_LENGTH}
              </div>
              {errors.experience && (
                <p className="text-sm text-red-500">{errors.experience}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="education" className="text-lg">Education</Label>
              <Input
                id="education"
                value={formData.education}
                onChange={(e) => {
                  setFormData({ ...formData, education: e.target.value });
                  setErrors({ ...errors, education: "" });
                }}
                placeholder="Your education details"
                className="text-lg"
                maxLength={MAX_EDUCATION_LENGTH}
              />
              <div className="flex justify-end text-sm text-muted-foreground">
                {formData.education.length}/{MAX_EDUCATION_LENGTH}
              </div>
              {errors.education && (
                <p className="text-sm text-red-500">{errors.education}</p>
              )}
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="flex min-h-[92vh] max-w-7xl justify-center mx-auto px-6 items-center">
      <div className="w-full max-w-4xl px-6 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="mb-3 text-4xl font-bold">
            {steps[currentStep]?.title}
          </h1>
          <p className="mb-10 text-xl text-muted-foreground">
            {steps[currentStep]?.description}
          </p>

          <div className="mb-10">
            <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentStep((prev) => prev - 1)}
              disabled={currentStep === 0}
              className="text-lg"
            >
              Previous
            </Button>

            <Button
              onClick={() => {
                if (validateStep()) {
                  if (currentStep === steps.length - 1) {
                    handleSubmit();
                  } else {
                    setCurrentStep((prev) => prev + 1);
                  }
                }
              }}
              className="text-lg"
            >
              {currentStep === steps.length - 1 ? "Complete" : "Next"}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Onboarding;
