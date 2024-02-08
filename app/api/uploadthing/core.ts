import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();



// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  artistImage: f({ image: { maxFileSize: "1024KB", maxFileCount: 1 } })
  
    .onUploadComplete(() => {}),
  releaseCover: f({ image: { maxFileSize: "1024KB", maxFileCount: 1 } })
 
    .onUploadComplete(() => {}),
  eventFlyer: f({ image: { maxFileSize: "1024KB", maxFileCount: 1 } })

    .onUploadComplete(() => {}),
  eventPhotos: f({ image: { maxFileSize: "1024KB", maxFileCount: 5 } })

    .onUploadComplete(() => {}),
  artistVideos: f({ video: { maxFileSize: "32MB", maxFileCount: 5 } })
   
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
