"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

export default function WaitlistPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const [onWaitlist, setOnWaitlist] = useState(false);
  useEffect(() => {
    setOnWaitlist(
      window.localStorage.getItem("waitlist") !== null ||
        window.localStorage.getItem("waitlist") !== null
    );
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!email) return toast.error("Please enter a valid email");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok || !data.error || data.success) {
        toast.success("🎉 You’re on the waitlist!");
        setEmail("");
        window.localStorage.setItem("waitlist", "true");
        setOnWaitlist(true);
      } else {
        toast.error(data.error || "Something went wrong. Try again.");
      }
    } catch {
      toast.error("Failed to connect. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-primary opacity-20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-120px] right-[-100px] w-[500px] h-[500px] bg-accent rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-secondary opacity-60 rounded-full blur-2xl animate-bounce translate-x-[-50%] translate-y-[-50%]"></div>
      </div>
      <main>
        <section className="min-h-screen flex flex-col items-center justify-center gap-3 p-2">
          <h1 className="text-center text-4xl md:text-5xl lg:text-6xl font-bold">
            Get Interview-Ready with AI.
          </h1>
          <p className="text-lg text-muted-foreground text-center mb-6">
            Daily questions. Instant feedback. 3 free mock interviews. Unlock
            your potential — one day at a time.
          </p>
          {!onWaitlist ? (
            <>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 items-center justify-center"
              >
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full sm:w-64"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button type="submit" disabled={loading}>
                  {loading ? "Joining..." : "Join Waitlist"}
                </Button>
              </form>
              <p className="text-sm text-muted-foreground mt-4">
                Be the first to try it before we launch 🚀
              </p>
            </>
          ) : (
            <>
              <Badge variant={"secondary"} className="text-lg">
                Already on Waitlist
              </Badge>

              <p className="text-center p-2">
                You&apos;ll be the first to try it before we launch 🚀
              </p>
            </>
          )}
        </section>
      </main>
    </div>
  );
}
