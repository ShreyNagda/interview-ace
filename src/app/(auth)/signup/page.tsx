"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleFormSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    setFormLoading(true);
    setError(null);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
    console.log(res);
    setFormLoading(false);

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Something went wrong");
    } else {
      router.replace("/onboarding");
    }
  };

  return (
    <div className="h-svh flex flex-col items-center justify-center px-4">
      <Card className="w-full max-w-md p-1 md:p-6">
        <CardTitle className="text-2xl md:text-4xl font-bold text-center pt-2">
          Welcome to <span className="mt-2">InterviewAce</span>
        </CardTitle>

        <CardContent className="flex flex-col gap-4 w-full p-2 md:p-6">
          <Button variant="outline" disabled>
            Continue with Google
          </Button>

          <div className="w-full flex items-center gap-2 text-sm text-gray-500 ">
            <hr className="flex-grow border-gray-300" />
            <span>OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <form
            className="flex flex-col space-y-2 md:space-y-4 transition-all duration-300"
            onSubmit={handleFormSubmit}
          >
            {error && (
              <div className="flex items-center justify-center gap-1 text-sm text-red-500">
                <Info size={16} />
                <span>{error}</span>
              </div>
            )}

            <Input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              type="email"
              placeholder="johndoe@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </Button>
            </div>

            <Button
              type="submit"
              className="mt-2 md:mt-4 w-full"
              disabled={formLoading}
            >
              {formLoading ? "Signing up..." : "Sign Up"}
            </Button>
            <div className="mx-auto">
              Already have an account?{" "}
              <Link href="/login" className="text-primary">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
