"use client";

import { UploadDropzone } from "@/lib/uploadthing";

import "@uploadthing/react/styles.css";
import { X } from "lucide-react";

import React, { useState } from "react";

interface FileUploadProps {
  endpoint: "artistImage" | "artistVideos" | "releaseCover" | "eventFlyer";
  value: string;
  onChange: (url?: string) => void;
}

const FileUpload = (props: FileUploadProps) => {
  const { endpoint, value, onChange } = props;

  const [file, setFile] = useState<any>(undefined);

  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="flex rounded-md items-center justify-start w-full">
        <div className="relative flex items-center group">
          <img
            src={value}
            alt=""
            className="w-20 h-20  object-cover rounded-lg p-3"
          />
          <button
            onClick={() => onChange("")}
            className="absolute  flex items-center justify-center w-full group-hover:opacity-100 p-2 transition-opacity duration-300 opacity-0 text-white rounded-full"
            type="button"
          >
            <X className="h-5 w-5 bg-rose-500 p-1 rounded-full" />
          </button>
        </div>
        {file && (
          <div className="ml-2">
          <p className="text-xs">
            {file[0].name.length > 15 &&
              `${file[0].name.substring(0, 15)}.${file[0].name.split(".")[1]}`}
          </p>
          <p className="text-xs">{file && file[0].size / 1000000} MB</p>
        </div>
        )}
      </div>
    );
  }

  return (
    <div className=" border  border-white/20 hover:border-white/50 transition-colors duration-200 ease-in-out rounded-md">
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
