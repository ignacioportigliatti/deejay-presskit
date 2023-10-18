import { db } from "@/lib/db";
import { Release } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body: Release = await req.json();
  try {
    const newRelease = await db.release.create({
      data: {
        name: body.name,
        label: body.label,
        date: body.date,
        imageSrc: body.imageSrc,
        soundCloudLink: body.soundCloudLink,
        buyLink: body.buyLink,
        description: body.description,
        artist: {
          connect: {
            id: body.artistId,
          },
        },
      },
    });
    return NextResponse.json(newRelease, {status: 200});
  } catch (error) {
    console.error("[ADD_RELEASE]", error);
    return NextResponse.json({ error: error }, {status: 500});
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const releaseId = searchParams.get("releaseId");

  try {
    const deletedRelease: Release = await db.release.delete({
      where: {
        id: releaseId as string,
      },
    });
    if (deletedRelease) {
      return NextResponse.json(deletedRelease, { status: 200 });
    } else {
      return new NextResponse("Bad Request", { status: 400 });
    }
  } catch (error) {
    console.error("[DELETE_ARTIST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const body: Release = await req.json();

  try {
    const updatedRelease: Release = await db.release.update({
      where: {
        id: body.id as string,
      },
      data: {
        name: body.name,
        label: body.label,
        date: body.date,
        imageSrc: body.imageSrc,
        soundCloudLink: body.soundCloudLink,
        buyLink: body.buyLink,
        description: body.description,
      },
    });
    if (updatedRelease) {
      return NextResponse.json(updatedRelease, { status: 200 });
    } else {
      return new NextResponse("Bad Request", { status: 400 });
    }
  } catch (error) {
    console.error("[UPDATE_RELEASE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}