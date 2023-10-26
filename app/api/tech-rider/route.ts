import { db } from "@/lib/db";
import { TechRider, } from "@prisma/client";
import { NextResponse } from "next/server";

interface TechRiderEntry {
  data: [
    {
        brand: string;
        models: string;
    }
  ]
  artistId: string;
  techRiderType: string;
}

export async function POST(req: Request) {
  const techRider: TechRiderEntry = await req.json();

  const dbTechRider = await db.techRider.findFirst({
    where: {
      artistId: techRider.artistId,
    },
  });


  const techRiderExists = dbTechRider !== null;

  if (!techRiderExists) {
    try {
      const newTechRider = await db.techRider.create({
        data: {
          cdPlayers: [],
          mixers: [],
          turntables: [],
          artist: {
            connect: {
              id: techRider.artistId,
            },
          },
        },
      });
      console.log("[CREATE_TECHRIDER]", newTechRider);
      try {
        const updatedTechRider = await db.techRider.update({
        where: {
            id: newTechRider.id,
        },
        data: {
            [techRider.techRiderType]: {
            set: techRider.data[0]
            },
        },
        });
        console.log("[UPDATE_TECHRIDER]", updatedTechRider);
        return NextResponse.json(updatedTechRider, {status: 200});
    } catch (error) {
        console.error("[UPDATE_TECHRIDER]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
    } catch (error) {
      console.error("[CREATE_TECHRIDER]", error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  } else if (techRiderExists) {
    try {
      const updatedTechRider = await db.techRider.update({
        where: {
          id: dbTechRider.id,
        },
        data: {
          [techRider.techRiderType]: {
           set: techRider.data[0]
          },
        },
      });
      console.log("[UPDATE_TECHRIDER]", updatedTechRider);
      return NextResponse.json(updatedTechRider, {status: 200});
    } catch (error) {
      console.error("[UPDATE_TECHRIDER]", error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }

    
}
