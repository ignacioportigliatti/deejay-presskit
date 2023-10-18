import { Artist } from "@prisma/client";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const artist: Artist = await req.json();
  try {
    const createdArtist: Artist = await db.artist.create({
      data: {
        name: artist.name,
        email: artist.email,
        location: artist.location,
        bio: artist.bio,
        imageSrc: artist.imageSrc,
        socialLinks: artist.socialLinks,
        genres: artist.genres,
      },
    });
    if (createdArtist) {
      return NextResponse.json(createdArtist, { status: 201 });
    } else {
      return new NextResponse("Bad Request", { status: 400 });
    }
  } catch (error) {
    console.error("[CREATE_ARTIST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const artistId = searchParams.get("artistId");

  try {
    const deletedArtist: Artist = await db.artist.delete({
      where: {
        id: artistId as string,
      },
    });
    if (deletedArtist) {
      return NextResponse.json(deletedArtist, { status: 200 });
    } else {
      return new NextResponse("Bad Request", { status: 400 });
    }
  } catch (error) {
    console.error("[DELETE_ARTIST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const artist: Artist = await req.json();
  try {
    const updatedArtist: Artist = await db.artist.update({
      where: {
        id: artist.id,
      },
      data: {
        name: artist.name,
        email: artist.email,
        location: artist.location,
        bio: artist.bio,
        imageSrc: artist.imageSrc,
        socialLinks: artist.socialLinks,
        genres: artist.genres,
      },
    });
    if (updatedArtist) {
      return NextResponse.json(updatedArtist, { status: 200 });
    } else {
      return new NextResponse("Bad Request", { status: 400 });
    }
  } catch (error) {
    console.error("[UPDATE_ARTIST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const artistId = searchParams.get("artistId");

  if (artistId) {
    try {
      const artist = await db.artist.findUnique({
        where: {
          id: artistId as string,
        },
      });
      if (artist) {
        return NextResponse.json(artist, { status: 200 });
      } else {
        return new NextResponse("Bad Request", { status: 400 });
      }
    } catch (error) {
      console.error("[GET_ARTIST]", error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }

  try {
    const artists = await db.artist.findMany();

    if (artists) {
      return NextResponse.json(artists, { status: 200 });
    } else {
      return new NextResponse("Bad Request", { status: 400 });
    }
  } catch (error) {
    console.error("[GET_ARTIST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
