import AdminSidebar from "@/components/admin/AdminSidebar";
import { db } from "@/lib/db"; 
import { Artist } from "@prisma/client";

export default async function  AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const artists: Artist[] = await db.artist.findMany();

  return (
    <main className="flex">
      <AdminSidebar artists={artists} />
      <div className="w-full h-full">{children}</div>
    </main>
  );
}
