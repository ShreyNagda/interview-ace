"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProfileForm from "@/components/Forms/ProfileForm"; // adjust path if needed

export default function OnboardingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const [data, setData] = useState<{
    title: string;
    level: string;
    resume: File | null;
  }>({
    title: "",
    level: "",
    resume: null,
  });

  const handleFormChange = (newData: typeof data) => {
    setData(newData);
  };

  const handleSuccess = () => {
    router.replace(`/${redirect}` || "/dashboard"); // Redirect on success
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 space-y-6">
      <h1 className="text-2xl font-semibold text-center">
        Complete Your Profile
      </h1>

      <ProfileForm
        data={data}
        onChange={handleFormChange}
        onSubmitSuccess={handleSuccess}
      />
    </div>
  );
}
