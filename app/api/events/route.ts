import { db } from "@/lib/db";
import { Event } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body: Event = await req.json();
  try {
    const newEvent = await db.event.create({
      data: {
        name: body.name,
        date: body.date,
        imageSrc: body.imageSrc,
        photosUrls: body.photosUrls,
        description: body.description as string,
        venue: {
          set: {
            name: body.venue?.name as string,
            location: body.venue?.location as string,
            socialLink: body.venue?.socialLink as string,
          }
        },
        artist: {
          connect: {
            id: body.artistId,
          },
        },
      },
    });
    return NextResponse.json(newEvent, {status: 200});
  } catch (error) {
    console.error("[ADD_RELEASE]", error);
    return NextResponse.json({ error: error }, {status: 500});
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const eventId = searchParams.get("eventId");

  try {
    const deletedEvent: Event = await db.event.delete({
      where: {
        id: eventId as string,
      },
    });
    if (deletedEvent) {
      return NextResponse.json(deletedEvent, { status: 200 });
    } else {
      return new NextResponse("Bad Request", { status: 400 });
    }
  } catch (error) {
    console.error("[DELETE_ARTIST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const body: Event = await req.json();

  try {
    const updatedEvent: Event = await db.event.update({
      where: {
        id: body.id as string,
      },
      data: {
        name: body.name,
        date: body.date,
        imageSrc: body.imageSrc,
        description: body.description,
        venue: {
          set: {
            name: body.venue?.name as string,
            location: body.venue?.location as string,
            socialLink: body.venue?.socialLink as string,
          }
        },
        artist: {
          connect: {
            id: body.artistId,
          },
        },
      },
    });
    if (updatedEvent) {
      return NextResponse.json(updatedEvent, { status: 200 });
    } else {
      return new NextResponse("Bad Request", { status: 400 });
    }
  } catch (error) {
    console.error("[UPDATE_RELEASE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}