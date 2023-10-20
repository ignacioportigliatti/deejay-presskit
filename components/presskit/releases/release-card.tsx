import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Release } from "@prisma/client";

interface ReleaseCardProps {
  release: Release;
}

export function ReleaseCard(props: ReleaseCardProps) {
  const { release } = props;
  return (
    <Card className="md:w-[210px] hover:border-white/70 duration-300 w-full">
      <CardHeader className="pb-2 md:w-[200px]  w-full">
        {release.imageSrc && (
          <img
            src={release.imageSrc}
            alt={release.name}
            className=" aspect-square object-cover"
          />
        )}
      </CardHeader>
      <CardContent className="pb-2 md:w-[200px]  w-full">
        <CardTitle className="text-lg">{release.name}</CardTitle>
        <CardDescription className="text-xs">
          <p>
            {release.format === "VinylDigital"
              ? "Vinyl & Digital"
              : release.format}
          </p>
          <p>{release.label}</p>
          <p>{release.date}</p>
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-start">
        <Button variant="defaultButton">+ Info</Button>
      </CardFooter>
    </Card>
  );
}
