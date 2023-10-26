import { Card, CardTitle } from "@/components/ui/card";
import { TechRiderObject } from "@prisma/client";
import React from "react";

type Props = {
  techRider: TechRiderObject[];
  title: string;
};

export const TechRiderCard = (props: Props) => {
  const { techRider, title } = props;

  return (
    <div>
      {techRider.length > 0 && (
        <Card className="p-8 h-full">
          <CardTitle>{title}</CardTitle>
          <div className="flex mt-1 flex-wrap gap-2">
            {techRider.map(
              (techRiderObj) =>
                techRiderObj.models.length > 0 && (
                  <div key={techRiderObj.brand as string}>
                    <h3 className="text-xl mb-2">
                      {techRiderObj.brand as string}
                    </h3>
                    <ul>
                      {techRiderObj.models.map((model, index) => (
                        <li key={model}>{model}</li>
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
