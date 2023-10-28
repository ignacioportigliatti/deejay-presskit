import { Card, CardTitle } from "@/components/ui/card";
import { TechRiderObject } from "@prisma/client";
import React from "react";
import { FaRecordVinyl } from "react-icons/fa";
import { SiPioneerdj } from "react-icons/si";

type Props = {
  techRider: TechRiderObject[];
  title: string;
  icon: React.ReactNode;
};

export const TechRiderCard = (props: Props) => {
  const { techRider, title, icon } = props;

  return (
    <div>
      {techRider.length > 0 && (
        <Card className="p-8  opacity-80 hover:opacity-100 hover:border-white/70 duration-300 h-full">
          <div className="flex justify-start gap-2 items-center">
          <CardTitle className="text-2xl">{title}</CardTitle>
          {icon}
          </div>
          <div className="flex flex-col mt-2 flex-wrap gap-2">
            {techRider.map(
              (techRiderObj) =>
                techRiderObj.models.length > 0 && (
                  <div key={techRiderObj.brand as string}>
                    <h3 className="uppercase text-base font-semibold mb-1">
                      {techRiderObj.brand as string}
                    </h3>
                    <ul className="flex flex-wrap gap-1">
                      {techRiderObj.models.map((model, index) => (
                        <li className="text-xs" key={model}>{model} /</li>
                      ))}
                    </ul>
                  </div>
                )
            )}
          </div>
        </Card>
      )}
    </div>
  );
};
