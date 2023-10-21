import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React from "react";

interface TechRiderFormInputProps {
    brands: string[];
    addField: () => void;
    removeField: any;
}

const TechRiderFormInput = (props: TechRiderFormInputProps) => {

  const { brands } = props;
  
  return (
    <div className="flex gap-1 h-full">
      <div className="grid grid-cols-2 w-full items-center gap-1">
        <div className="flex flex-col space-y-1.5">
          <Select>
            <SelectTrigger id="brand">
              <SelectValue placeholder="Brand" />
            </SelectTrigger>
            <SelectContent position="popper">
              {brands.map((brand) => (
                <SelectItem value={brand} key={brand} id={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col space-y-1.5">
          <Input id="name" placeholder="Model" />
        </div>
      </div>
      <button className="border rounded-md w-12 hover:bg-white/20 duration-300">
        +
      </button>
    </div>
  );
};

export default TechRiderFormInput;
