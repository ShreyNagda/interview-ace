"use client";

import { useState } from "react";
import BasicForm from "@/components/Forms/BasicForm";
import ProfileForm from "@/components/Forms/ProfileForm";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Header from "./Header";

export default function ProfilePageComponent({ user }: { user: IUser }) {
  const [basicData, setBasicData] = useState({
    name: user.name,
    email: user.email,
    profileImage: user.image || "",
  });

  const [profileData, setProfileData] = useState<{
    title: string;
    level: string;
    resume: File | null;
    resumeContext?: string;
  }>({
    title: user.job?.title || "",
    level: user.job?.level || "",
    resume: null,
    resumeContext: user.resumeContext || "",
  });

  return (
    <>
      <Header user={user} />
      <div className="max-w-xl mx-auto p-6">
        <Tabs defaultValue="basic" className="space-y-4">
          {/* Tab Triggers */}
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="profile">Job Profile</TabsTrigger>
          </TabsList>

          {/* Tab Content */}
          <TabsContent value="basic">
            <BasicForm
              data={basicData}
              onChange={setBasicData}
              onSubmitSuccess={() => {}}
            />
          </TabsContent>

          <TabsContent value="profile">
            <ProfileForm
              data={profileData}
              onChange={setProfileData}
              onSubmitSuccess={() => {}}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
