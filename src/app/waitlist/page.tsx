"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";

import { Lightbulb, Video, Flame, BarChart, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function WaitlistPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const features = [
    {
      title: "Daily AI-Powered Questions",
      icon: Lightbulb,
      description:
        "Start each day with a unique, tailored interview question to sharpen your skills.",
    },
    {
      title: "Video Answer Practice",
      icon: Video,
      description:
        "Record your answers and receive instant feedback to improve in real time.",
    },
    {
      title: "Build Your Streak",
      icon: Flame,
      description:
        "Stay consistent and motivated with a visual streak tracker.",
    },
    {
      title: "Progress & Score Tracking",
      icon: BarChart,
      description:
        "See how you’re improving over time with a personal performance dashboard.",
    },
    {
      title: "Mock Interviews (Free)",
      icon: Users,
      description:
        "Get 3 full mock interviews to simulate real-world interview scenarios.",
    },
  ];

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
    <div className="overflow-y-auto">
      {/* Hero Section */}
      <section className="h-[450px]  flex flex-col items-center justify-center gap-3 p-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
          Get Interview-Ready with AI.
        </h1>
        <p className="text-lg text-muted-foreground mb-6 max-w-xl">
          Daily questions. Instant feedback. 3 free mock interviews. Unlock your
          potential — one day at a time.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 items-center justify-center w-full max-w-md"
        >
          <Input
            type="email"
            placeholder="Enter your email"
            className="w-full"
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
      </section>

      {/* Image Section */}

      <section className="py-12 px-4 md:px-8">
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg max-w-4xl mx-auto">
          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
            <Image
              src="/3.png"
              alt="Dashboard preview"
              fill
              priority
              className="object-contain rounded-xl"
            />
          </div>
          <h2 className="text-3xl font-bold text-center mb-10">
            Everything You Need to Succeed
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center gap-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <footer className="p-4 text-center text-lg">
        &copy; InterviewAce 2025
      </footer>
    </div>
  );
}
