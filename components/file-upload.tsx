"use client";

import { UploadDropzone } from "@/lib/uploadthing";

import "@uploadthing/react/styles.css";
import { X } from "lucide-react";

import React, { useState } from "react";

interface FileUploadProps {
  endpoint: "artistImage" | "artistVideos" | "releaseCover" | "eventFlyer" | "eventPhotos";
  value: string | string[];
  onChange: (url?: string) => void;
}

const FileUpload = (props: FileUploadProps) => {
  const { endpoint, value, onChange } = props;

  const [file, setFile] = useState<any>(undefined);

  const fileType = typeof value === "string" && value.split(".")[1];

  if (value && fileType !== "pdf") {
    return (
      <div className="flex rounded-md items-center justify-start w-full">
        {typeof value === "string" && (
          <div className="relative flex items-center group">
            <img
              src={value}
              alt=""
              className="w-20 h-20 object-cover rounded-lg p-3"
            />
            <button
              onClick={() => onChange("")}
              className="absolute  flex items-center justify-center w-full group-hover:opacity-100 p-2 transition-opacity duration-300 opacity-0 text-white rounded-full"
              type="button"
            >
              <X className="h-5 w-5 bg-rose-500 p-1 rounded-full" />
            </button>
          </div>
        )}
        {Array.isArray(value) && (
          <div className="flex space-x-2">
            {value.map((v, i) => (
              <div key={`value-${i}`} className="relative flex items-center group">
                <img
                  src={v}
                  alt=""
                  className="w-20 h-20 object-cover rounded-lg p-3"
                />
                <button
                  onClick={() => onChange("")}
                  className="absolute  flex items-center justify-center w-full group-hover:opacity-100 p-2 transition-opacity duration-300 opacity-0 text-white rounded-full"
                  type="button"
                >
                  <X className="h-5 w-5 bg-rose-500 p-1 rounded-full" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="transition-colors duration-200 ease-in-out rounded-md">
      <UploadDropzone
        config= {{
          mode: "auto",
        }}
        appearance={{
          button:
            "bg-transparent h-max w-max px-2 py-1 text-white/50 hover:text-white/80 border border-white/50 transition-colors duration-200 ease-in-out font-light text-xs",
          uploadIcon: "w-8 h-8",
          container: "space-y-0 !max-h-36 p-2 ",
          label:
            "text-white/70 text-xs font-normal hover:text-white transition-colors duration-200 ease-in-out",
          allowedContent: "text-white/50 font-light text-[10px]",
        }}
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url);
          setFile(res);
          console.log(res);
        }}
        onUploadError={(err) => {
          console.log(err);
        }}
      />
    </div>
  );
};

export default FileUpload;
