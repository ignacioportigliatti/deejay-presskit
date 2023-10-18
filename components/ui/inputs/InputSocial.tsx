import { Button } from "@/components/ui/button";
import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  FaBandcamp,
  FaInstagram,
  FaSoundcloud,
  FaSpotify,
} from "react-icons/fa";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Plus } from "lucide-react";
import { Dispatch, SetStateAction, forwardRef, useState } from "react";

type InputSocialProps = InputProps & {
  onChange: Dispatch<SetStateAction<{name: string, link: string}[]>>;
  links?: { name: string; link: string }[];
};

export const InputSocial = forwardRef<HTMLInputElement, InputSocialProps>(
  ({ value, onChange, ...props }, ref) => {
   
    const [inputLinks, setInputLinks] = useState([
      {
        name: "Instagram",
        icon: <FaInstagram className="w-4 -ml-4 text-white/60" />,
        link: props.links ? props.links[0].link : "",
      },
      {
        name: "Soundcloud",
        icon: <FaSoundcloud className="w-4 -ml-4 text-white/60" />,
        link: props.links ? props.links[1].link : "",
      },
      {
        name: "Spotify",
        icon: <FaSpotify className="w-4 -ml-4 text-white/60" />,
        link: props.links ? props.links[2].link : "",
      },
      {
        name: "Bandcamp",
        icon: <FaBandcamp className="w-4 -ml-4 text-white/60" />,
        link: props.links ? props.links[3].link : "",
      },
    ]);

    const handleInputChange = (idx: number, newValue: string) => {
      setInputLinks((prev) => {
        const newState = [...prev];
        newState[idx].link = newValue;
        return newState;
      });

      // Crear un array de enlaces para enviar al componente padre
      const linksArray = inputLinks.map((item) => {
        return { name: item.name, link: item.link };
      });
      onChange(linksArray);
    };

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button className="w-full gap-x-1" variant="defaultButton">
            <Plus className="w-4" /> Social Links
          </Button>
        </PopoverTrigger>
        <PopoverContent className="gap-1 h-full items-center w-96 p-4 bg-background">
          <div className="grid gap-1 w-full h-full flex-grow">
            <form action="">
              {inputLinks.map((item, idx) => (
                <div className="flex" key={idx}>
                  <Input
                    value={item.link}
                    placeholder={item.name}
                    onChange={(e) => handleInputChange(idx, e.target.value)}
                    ref={ref}
                    variant="underline"
                    inputSize={"xs"}
                    className="w-full"
                  />
                </div>
              ))}
            </form>
          </div>
        </PopoverContent>
      </Popover>
    );
  }
);

InputSocial.displayName = "InputSocial";
