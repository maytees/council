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
import { toast } from "sonner";

// User related constants
const MAX_BIO_LENGTH = 500;
const MAX_POSITION_LENGTH = 100;
const MAX_LOCATION_LENGTH = 100;
const MAX_SKILLS_LENGTH = 200;
const MAX_EXPERIENCE_LENGTH = 50;
const MAX_EDUCATION_LENGTH = 200;
const MAX_SCHOOL_LENGTH = 100;

// Company related constants
const MAX_COMPANY_LENGTH = 100;
const MAX_DESCRIPTION_LENGTH = 1000;
const MAX_WEBSITE_LENGTH = 200;
const MAX_INDUSTRY_LENGTH = 100;
const MAX_SIZE_LENGTH = 50;

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
  {
    id: "school-code",
    title: "School Code",
    description: "Enter your school join code",
  },
];

const Onboarding = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // User information
    userType: "",
    bio: "",
    position: "",
    location: "",
    skills: "",
    experience: "",
    education: "",

    // School related
    schoolCode: "",
    school: "",
    isNewSchool: false,

    // Company information
    company: "",
    description: "",
    website: "",
    industry: "",
    size: "",
    founded: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [schoolJoinCode, setSchoolJoinCode] = useState<string>("");
  // const utils = api.useUtils();

  const updateProfile = api.profile.update.useMutation({
    onSuccess: () => {
      toast.success("Profile setup completed successfully!");
      router.push("/dashboard");
    },
    onError: (error) => {
      toast.error("Failed to complete profile setup: " + error.message);
    },
  });

  const verifySchoolCode = api.profile.verifySchoolCode.useMutation({
    onError: (_) => {
      setErrors({ ...errors, schoolCode: "Invalid school code" });
    },
  });

  const joinSchool = api.school.join.useMutation({
    onError: (_) => {
      setErrors({ ...errors, schoolCode: "Invalid school code" });
    },
  });

  const createSchool = api.school.create.useMutation({
    onSuccess: (data) => {
      setSchoolJoinCode(data.joinCode);
    },
    onError: (error) => {
      setErrors({ ...errors, school: error.message });
    },
  });

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const validateStep = async () => {
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
        if (!formData.position.trim()) {
          newErrors.position = "Position is required";
        } else if (formData.position.length > MAX_POSITION_LENGTH) {
          newErrors.position = `Position must be ${MAX_POSITION_LENGTH} characters or less`;
        }
        if (formData.userType === "COUNSELOR" && formData.school.trim()) {
          if (formData.school.length > MAX_SCHOOL_LENGTH) {
            newErrors.school = `School name must be ${MAX_SCHOOL_LENGTH} characters or less`;
          } else {
            try {
              const result = await createSchool.mutateAsync({
                name: formData.school,
                location: formData.location || "Unknown",
              });
              setFormData({
                ...formData,
                schoolCode: result.joinCode,
                userType: formData.userType,
              });
            } catch (error) {
              console.error(error);
              return false;
            }
          }
        }
        if (formData.userType === "COMPANY") {
          if (!formData.company.trim()) {
            newErrors.company = "Company name is required";
          } else if (formData.company.length > MAX_COMPANY_LENGTH) {
            newErrors.company = `Company name must be ${MAX_COMPANY_LENGTH} characters or less`;
          }
          if (!formData.description.trim()) {
            newErrors.description = "Company description is required";
          } else if (formData.description.length > MAX_DESCRIPTION_LENGTH) {
            newErrors.description = `Description must be ${MAX_DESCRIPTION_LENGTH} characters or less`;
          }
          if (!formData.industry.trim()) {
            newErrors.industry = "Industry is required";
          } else if (formData.industry.length > MAX_INDUSTRY_LENGTH) {
            newErrors.industry = `Industry must be ${MAX_INDUSTRY_LENGTH} characters or less`;
          }
          if (!formData.size.trim()) {
            newErrors.size = "Company size is required";
          }
          if (formData.website && !isValidUrl(formData.website)) {
            newErrors.website = "Please enter a valid URL";
          }
          const foundedYear = parseInt(formData.founded);
          if (
            formData.founded &&
            (isNaN(foundedYear) ||
              foundedYear < 1800 ||
              foundedYear > new Date().getFullYear())
          ) {
            newErrors.founded = "Please enter a valid founding year";
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
      case 3:
        if (
          (formData.userType === "STUDENT" ||
            formData.userType === "COUNSELOR") &&
          !formData.schoolCode.trim()
        ) {
          newErrors.schoolCode = "School code is required";
        } else if (formData.schoolCode.trim()) {
          try {
            await verifySchoolCode.mutateAsync({
              schoolCode: formData.schoolCode,
            });
            await joinSchool.mutateAsync({
              joinCode: formData.schoolCode,
              userType: formData.userType,
            });
          } catch (error) {
            console.error(error);
            return false;
          }
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async () => {
    if (await validateStep()) {
      try {
        await updateProfile.mutateAsync({
          userType: formData.userType as "STUDENT" | "COMPANY" | "COUNSELOR",
          bio: formData.bio,
          schoolCode: formData.schoolCode,
          position: formData.position,
          company: formData.company,
          location: formData.location,
          skills: formData.skills,
          experience: formData.experience,
          education: formData.education,
          // Add company-specific fields when userType is COMPANY
          ...(formData.userType === "COMPANY" && {
            description: formData.description,
            website: formData.website,
            industry: formData.industry,
            size: formData.size,
            founded: formData.founded,
          }),
        });
      } catch (error) {
        console.error('Profile update failed:', error);
        setErrors(prev => ({ ...prev, submit: "Failed to update profile information" }));
      }
    }
  };

  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
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
                <Label htmlFor="student" className="text-lg">
                  Student
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="COUNSELOR" id="counselor" />
                <Label htmlFor="counselor" className="text-lg">
                  Counselor
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="COMPANY" id="company" />
                <Label htmlFor="company" className="text-lg">
                  Company
                </Label>
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
            <div className=" ">
              <Label htmlFor="bio" className="text-lg">
                Bio
              </Label>
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

            <div className="">
              <Label htmlFor="position" className="text-lg">
                Position
              </Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => {
                  setFormData({ ...formData, position: e.target.value });
                  setErrors({ ...errors, position: "" });
                }}
                placeholder="Your current position"
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

            {formData.userType === "COUNSELOR" && (
              <div className="space-y-6">
                <div className=" ">
                  <Label htmlFor="school" className="text-lg">
                    School Name
                  </Label>
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
                  {errors.school && (
                    <p className="text-sm text-red-500">{errors.school}</p>
                  )}
                  {schoolJoinCode && (
                    <p className="mt-2 text-sm text-green-500">
                      School created successfully! Join code: {schoolJoinCode}
                    </p>
                  )}
                </div>
              </div>
            )}

            {formData.userType === "COMPANY" && (
              <div className="space-y-6">
                <div className=" ">
                  <Label htmlFor="company" className="text-lg">
                    Company Name
                  </Label>
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
                  {errors.company && (
                    <p className="text-sm text-red-500">{errors.company}</p>
                  )}
                </div>

                <div className=" ">
                  <Label htmlFor="description" className="text-lg">
                    Company Description
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => {
                      setFormData({ ...formData, description: e.target.value });
                      setErrors({ ...errors, description: "" });
                    }}
                    placeholder="Describe your company..."
                    className="min-h-[120px] text-lg"
                    maxLength={MAX_DESCRIPTION_LENGTH}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500">{errors.description}</p>
                  )}
                </div>

                <div className=" ">
                  <Label htmlFor="website" className="text-lg">
                    Website (Optional)
                  </Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => {
                      setFormData({ ...formData, website: e.target.value });
                      setErrors({ ...errors, website: "" });
                    }}
                    placeholder="https://your-company.com"
                    className="text-lg"
                    maxLength={MAX_WEBSITE_LENGTH}
                  />
                  {errors.website && (
                    <p className="text-sm text-red-500">{errors.website}</p>
                  )}
                </div>

                <div className=" ">
                  <Label htmlFor="industry" className="text-lg">
                    Industry
                  </Label>
                  <Input
                    id="industry"
                    value={formData.industry}
                    onChange={(e) => {
                      setFormData({ ...formData, industry: e.target.value });
                      setErrors({ ...errors, industry: "" });
                    }}
                    placeholder="e.g. Technology, Healthcare, Education"
                    className="text-lg"
                    maxLength={MAX_INDUSTRY_LENGTH}
                  />
                  {errors.industry && (
                    <p className="text-sm text-red-500">{errors.industry}</p>
                  )}
                </div>

                <div className=" ">
                  <Label htmlFor="size" className="text-lg">
                    Company Size
                  </Label>
                  <Input
                    id="size"
                    value={formData.size}
                    onChange={(e) => {
                      setFormData({ ...formData, size: e.target.value });
                      setErrors({ ...errors, size: "" });
                    }}
                    placeholder="e.g. 1-10, 11-50, 51-200"
                    className="text-lg"
                    maxLength={MAX_SIZE_LENGTH}
                  />
                  {errors.size && (
                    <p className="text-sm text-red-500">{errors.size}</p>
                  )}
                </div>

                <div className=" ">
                  <Label htmlFor="founded" className="text-lg">
                    Founded Year (Optional)
                  </Label>
                  <Input
                    id="founded"
                    type="number"
                    value={formData.founded}
                    onChange={(e) => {
                      setFormData({ ...formData, founded: e.target.value });
                      setErrors({ ...errors, founded: "" });
                    }}
                    placeholder="e.g. 2020"
                    className="text-lg"
                    min="1800"
                    max={new Date().getFullYear()}
                  />
                  {errors.founded && (
                    <p className="text-sm text-red-500">{errors.founded}</p>
                  )}
                </div>
              </div>
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
            className="flex flex-col"
          >
            <div className="space-y-0">
              <Label htmlFor="location" className="text-lg">
                Location
              </Label>
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

            <div className=" ">
              <Label htmlFor="skills" className="text-lg">
                Skills
              </Label>
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

            <div className=" ">
              <Label htmlFor="experience" className="text-lg">
                Experience
              </Label>
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

            <div className=" ">
              <Label htmlFor="education" className="text-lg">
                Education
              </Label>
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

      case 3:
        return formData.userType === "STUDENT" ||
          formData.userType === "COUNSELOR" ? (
          <motion.div
            key="step-3"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div className=" ">
              <Label htmlFor="schoolCode" className="text-lg">
                School Code
              </Label>
              <Input
                id="schoolCode"
                value={formData.schoolCode}
                onChange={(e) => {
                  const upperValue = e.target.value.toUpperCase();
                  setFormData({ ...formData, schoolCode: upperValue });
                  setErrors({ ...errors, schoolCode: "" });
                }}
                disabled={formData.userType === "COUNSELOR"}
                placeholder="Enter your school code"
                className="text-lg"
                maxLength={6}
              />
              <p className="text-sm font-light text-muted-foreground">
                {formData.userType === "STUDENT"
                  ? "Ask your counselor for your school code."
                  : "Give this code to students in your school upon registration."}
              </p>
              {errors.schoolCode && (
                <p className="text-sm text-red-500">{errors.schoolCode}</p>
              )}
            </div>
          </motion.div>
        ) : null;
    }
  };

  const shouldShowStep = (step: number) => {
    if (step === 3) {
      return (
        formData.userType === "STUDENT" || formData.userType === "COUNSELOR"
      );
    }
    return true;
  };

  return (
    <div className="mx-auto flex min-h-[92vh] max-w-7xl items-center justify-center px-6">
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
              onClick={async () => {
                if (await validateStep()) {
                  if (
                    currentStep === steps.length - 1 ||
                    (currentStep === 2 && formData.userType === "COMPANY")
                  ) {
                    await handleSubmit();
                  } else {
                    let nextStep = currentStep + 1;
                    while (
                      nextStep < steps.length &&
                      !shouldShowStep(nextStep)
                    ) {
                      nextStep++;
                    }
                    setCurrentStep(nextStep);
                  }
                }
              }}
              className="text-lg"
            >
              {currentStep === steps.length - 1 ||
                (currentStep === 2 && formData.userType === "COMPANY")
                ? "Complete"
                : "Next"}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Onboarding;
