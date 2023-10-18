import { db } from "@/lib/db";
import ArtistsGrid from "@/components/admin/artist/ArtistsGrid";
import NewArtistModal from "@/components/admin/modals/NewArtistModal";

export default async function AdminPage() {
  const artists = await db.artist.findMany();

  return (
    <div className="dark:bg-background h-full w-full min-h-screen p-12 md:p-36 flex flex-col justify-center items-center dark:text-white">
      {artists.length > 0 && (
        <div className="flex flex-col items-center justify-center w-full gap-2">
          <ArtistsGrid artists={artists} />
          <NewArtistModal />
        </div>
      )}

      {artists.length === 0 && (
        <div className="space-y-2">
          <h6>No artists found, you have to create one first.</h6>
          <NewArtistModal />
        </div>
      )}
    </div>
  );
}
