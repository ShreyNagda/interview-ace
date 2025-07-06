"use client";
import { useState, useRef, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { UploadCloud, Loader2 } from "lucide-react";
import clsx from "clsx";
import { toast } from "sonner";

type ProfileData = {
  title: string;
  level: string;
  resume: File | null;
  resumeContext?: string;
};

type ProfileFormProps = {
  data: ProfileData;
  onChange: (data: ProfileData) => void;
  onSubmitSuccess?: () => void;
};

export default function ProfileForm({
  data,
  onChange,
  onSubmitSuccess,
}: ProfileFormProps) {
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      onChange({ ...data, resume: file });
    } else {
      toast.error("Upload a PDF file");
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      onChange({ ...data, resume: file });
    } else {
      toast.error("Only PDF files are allowed.");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!data.title || !data.level || !data.resume) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("resume", data.resume);
    formData.append("jobTitle", data.title);
    formData.append("jobLevel", data.level);

    const res = await fetch("/api/profile/onboard", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      // const result = await res.json();
      toast.success("Profile updated");
      onSubmitSuccess?.();
    } else {
      const error = await res.json();
      toast.error(error.message || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Job Title */}
        <div>
          <Label htmlFor="jobTitle">Job Title</Label>
          <Input
            id="jobTitle"
            value={data.title}
            onChange={(e) => onChange({ ...data, title: e.target.value })}
            required
            placeholder="e.g. Frontend Developer"
          />
        </div>

        {/* Job Level */}
        <div>
          <Label htmlFor="jobLevel">Job Level</Label>
          <Select
            value={data.level}
            onValueChange={(value) => onChange({ ...data, level: value })}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select job level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="entry">Entry</SelectItem>
              <SelectItem value="junior">Junior</SelectItem>
              <SelectItem value="associate">Associate</SelectItem>
              <SelectItem value="senior">Senior</SelectItem>
              <SelectItem value="lead">Lead</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Resume */}
        <div>
          <Label htmlFor="resume">Resume</Label>
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={clsx(
              "w-full border-2 border-dashed rounded-lg px-6 py-10 text-sm cursor-pointer",
              dragActive
                ? "border-blue-500 bg-blue-50"
                : "border-muted-foreground/50"
            )}
            onClick={() => inputRef.current?.click()}
          >
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <UploadCloud className="w-6 h-6" />
              {data.resume ? (
                <p className="text-green-600 font-medium">
                  Uploaded: {data.resume.name}
                </p>
              ) : (
                <>
                  <p className="font-medium">Drag & drop your resume here</p>
                  <p>or click to upload (PDF only)</p>
                </>
              )}
            </div>
            <input
              type="file"
              accept="application/pdf"
              ref={inputRef}
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </div>

        <Button type="submit" className="w-full mt-4" disabled={loading}>
          {loading ? <Loader2 className="animate-spin" /> : "Save Profile"}
        </Button>
      </form>

      {/* ✅ Display the summary below the form */}
      {data.resumeContext && (
        <div className="mt-6 border rounded-lg p-4 bg-muted">
          <h3 className="text-lg font-semibold mb-2">
            AI Resume Summary{" "}
            <span className="text-foreground/30">(Existing resume)</span>
          </h3>
          <p className="text-muted-foreground whitespace-pre-line">
            {data.resumeContext}
          </p>
        </div>
      )}
    </>
  );
}
