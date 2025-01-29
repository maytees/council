import { googleSignIn } from "@/actions/authActions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { auth, signIn } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    return redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center pb-32">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Hello.</CardTitle>
          <CardDescription>
            To continue, please log in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={async (formData: FormData) => {
              "use server";
              await signIn("resend", formData);
            }}
          >
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                {/* This is because u cant pass it into await signIn("resend") */}
                <input type="hidden" name="redirectTo" value="/dashboard" />
                <Input
                  id="email"
                  name="email"
                  placeholder="name@example.com"
                  type="email"
                  required
                />
              </div>
              <Button type="submit">Send Magic Link</Button>
            </div>
          </form>
          <div className="relative my-4">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-muted-foreground">
              OR
            </span>
          </div>
          <form action={googleSignIn}>
            <Button variant="outline" className="w-full" type="submit">
              Sign in with Google
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
