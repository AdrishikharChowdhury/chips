"use client";
import { useRef, useState } from "react";
import { Image, upload } from "@imagekit/next";
import { config } from "@/lib/config";
import { toast } from "sonner";

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

interface ImageUploadProps {
  onUpload: (url: string) => void;
  value?: string;
}

export default function ImageUpload({ onUpload, value }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(value ?? null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedUrl(null);
    setUploading(true);

    try {
      const authResponse = await fetch("/api/auth/imagekit");
      if (!authResponse.ok) throw new Error("Auth failed");
      const { signature, expire, token } = await authResponse.json();

      const result = await upload({
        file,
        fileName: file.name,
        publicKey,
        signature,
        expire,
        token,
      });

      const imageUrl = result.url ?? result.filePath ?? "";
      setUploadedUrl(imageUrl);
      onUpload(imageUrl);
      toast.success("Upload successful");
    } catch (err) {
      toast.error(
        `Upload failed: ${err instanceof Error ? err.message : String(err)}`,
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="component-form_input file:mr-4 file:rounded-none file:border-0 file:bg-cobalt-blue file:px-4 file:py-2 file:text-sm file:font-bold file:text-cream-paper"
      />
      {uploading && (
        <p className="text-sm text-midnight-ink/60">Uploading...</p>
      )}
      {uploadedUrl && (
        <Image
          src={uploadedUrl}
          urlEndpoint={urlEndpoint}
          alt="Uploaded card"
          width={500}
          height={300}
          className="w-full rounded-2xl border-2 border-midnight-ink/10 object-cover"
        />
      )}
    </div>
  );
}
