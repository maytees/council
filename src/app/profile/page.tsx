"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { api } from "@/trpc/react";
import { Building2, GraduationCap, MapPin, School2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();
    const { data: profile, isLoading } = api.profile.get.useQuery();

    if (isLoading) {
        return (
            <div className="container flex items-center justify-center min-h-screen">
                <div className="animate-pulse">Loading...</div>
            </div>
        );
    }

    if (!profile?.profileCompleted) {
        router.push("/profile/complete");
        return null;
    }

    return (
        <div className="container py-10">
            <Card className="max-w-3xl mx-auto">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-2xl">{profile.name}</CardTitle>
                            <CardDescription>{profile.email}</CardDescription>
                        </div>
                        <Button onClick={() => router.push("/profile/edit")}>
                            Edit Profile
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h3 className="font-semibold mb-2">About Me</h3>
                        <p className="text-muted-foreground">{profile.bio}</p>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{profile.location}</span>
                        </div>

                        {profile.userType === "COMPANY" && (
                            <div className="flex items-center gap-2">
                                <Building2 className="h-4 w-4 text-muted-foreground" />
                                <span>{profile.company}</span>
                            </div>
                        )}

                        {(profile.userType === "STUDENT" || profile.userType === "COUNSELOR") && (
                            <>
                                <div className="flex items-center gap-2">
                                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                    <span>{profile.education}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <School2 className="h-4 w-4 text-muted-foreground" />
                                    <span>{profile.school}</span>
                                </div>
                            </>
                        )}
                    </div>

                    <Separator />

                    <div>
                        <h3 className="font-semibold mb-2">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {profile.skills?.split(",").map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-sm"
                                >
                                    {skill.trim()}
                                </span>
                            ))}
                        </div>
                    </div>

                    {profile.experience && (
                        <>
                            <Separator />
                            <div>
                                <h3 className="font-semibold mb-2">Experience</h3>
                                <p className="text-muted-foreground">{profile.experience}</p>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
} 