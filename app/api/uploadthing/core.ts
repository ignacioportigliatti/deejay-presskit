import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = () => {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");
  return { userId: userId };
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  artistImage: f({ image: { maxFileSize: "1024KB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  releaseCover: f({ image: { maxFileSize: "1024KB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  eventFlyer: f({ image: { maxFileSize: "1024KB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  eventPhotos: f({ image: { maxFileSize: "1024KB", maxFileCount: 5 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  artistVideos: f({ video: { maxFileSize: "32MB", maxFileCount: 5 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
