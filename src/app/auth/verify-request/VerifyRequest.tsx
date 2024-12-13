"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EmailVerificationPage() {
  const [countdown, setCountdown] = useState(45);
  const router = useRouter();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  return (
    <div className="flex min-h-screen items-center justify-center pb-32">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Check Your Email</CardTitle>
          <CardDescription>
            We&apos;ve sent you a verification link. Please check your email to
            verify your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            className="w-full"
            onClick={() => router.push("/auth/signin")}
            disabled={countdown > 0}
          >
            Back to Sign In
          </Button>
        </CardContent>
        <CardFooter>
          {countdown > 0 ? (
            <p className="text-sm text-muted-foreground">
              Please wait {countdown} seconds before going back to sign in. Give
              time for the email to send before resending it by going back to
              the sign in...
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              If you still haven&apos;t recieved the email, try resending it.
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
