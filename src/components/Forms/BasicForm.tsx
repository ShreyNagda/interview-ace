"use client";

import { useRef, useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Camera } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type BasicData = {
  name: string;
  email: string;
  profileImage: string; // base64
};

type BasicFormProps = {
  data: BasicData;
  onChange: (data: BasicData) => void;
  onSubmitSuccess?: () => void;
};

export default function BasicForm({
  data,
  onChange,
  onSubmitSuccess,
}: BasicFormProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const fallbackInitials = data.name
    ? data.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "US";

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please upload a valid image.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      onChange({ ...data, profileImage: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/profile/basic", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      toast.success("Basic info saved");
      onSubmitSuccess?.();
    } else {
      toast.error("Failed to save info");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex md:flex-row flex-col items-center gap-6">
        <div className="flex-1 space-y-4 order-2 md:order-none">
          <div className="">
            <Label className="w-28">Name</Label>
            <Input
              value={data.name}
              onChange={(e) => onChange({ ...data, name: e.target.value })}
              className="flex-1"
              required
            />
          </div>

          <div className="">
            <Label className="w-28">Email</Label>
            <Input
              type="email"
              value={data.email}
              onChange={(e) => onChange({ ...data, email: e.target.value })}
              className="flex-1"
              required
            />
          </div>
        </div>
        {/* Avatar with upload overlay */}
        <div className="relative group border rounded-full p-2 order-1 md:order-none">
          <Avatar className="w-32 h-32">
            <AvatarImage src={data.profileImage} alt="Profile" />
            <AvatarFallback>{fallbackInitials}</AvatarFallback>
          </Avatar>

          {/* Upload Overlay */}
          {/* <div
            className={clsx(
              "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full text-white text-xs"
            )}
          >
            <UploadCloud className="w-4 h-4 mr-1" />
            Upload
          </div> */}

          <input
            type="file"
            accept="image/*"
            ref={fileRef}
            onChange={handleImageChange}
            className="hidden"
          />
          <Button
            type="button"
            variant={"secondary"}
            size={"icon"}
            className="absolute bottom-0 right-0 px-0 cursor-pointer"
            onClick={() => fileRef.current?.click()}
          >
            <Camera />
          </Button>
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}
