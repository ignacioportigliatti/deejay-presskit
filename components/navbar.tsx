"use client";

import { Artist } from "@prisma/client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRightFromLine, Calendar, Home } from "lucide-react";
import { FaRecordVinyl } from "react-icons/fa";
import { SiPioneerdj } from "react-icons/si";
import { useSelectedArtist } from "@/state/selected-artist";


const NavBar = () => {
  const { selectedArtist } = useSelectedArtist();
  const [position, setPosition] = React.useState("home");
  const [open, setOpen] = React.useState(false);

  const pathname = usePathname();

  const navItems = [
    {
      name: "Home",
      href: `/${selectedArtist?.name}`,
      icon: <Home className="h-3 w-3"/>,
    },
    {
      name: "Releases",
      href: `/${selectedArtist?.name}/releases`,
      icon: <FaRecordVinyl className="h-3 w-3"/>,
    },
    {
      name: "Gigs",
      href: `/${selectedArtist?.name}/gigs`,
      icon: <Calendar className="h-3 w-3"/>,
    },
    {
      name: "Tech Rider",
      href: `/${selectedArtist?.name}/tech-rider`,
      icon: <SiPioneerdj className="h-3 w-3"/>,
    },
  ];

  return (
    <div className="fixed flex items-center px-9 justify-between z-50 text-white top-0 h-16 w-full">
      <div>
        {pathname !== `/${selectedArtist?.name}` && (
            <Link href={`/${selectedArtist?.name}`}>
              {selectedArtist?.name}
            </Link>
        )}        
      </div>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger onMouseEnter={() => setOpen(true)}  onMouseLeave={() => {
          setTimeout(() => {
            setOpen(false)
          }, 10000);
        }} asChild>
          <Button variant="outline" className="capitalize">
            {navItems.find((item) => item.href === pathname)?.name}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="p-0 text-end">
          <DropdownMenuLabel>{selectedArtist?.name} Presskit</DropdownMenuLabel>
          <DropdownMenuSeparator className="m-0" />
          <div className="flex flex-col gap-1 items-end">
            {navItems.map((item) => (
              <Link
                key={item.name}
                className="hover:bg-stone-600 px-2 group py-1 duration-300 w-full"
                onClick={() => setOpen(false)}
                href={item.href}
              >
                <button className="text-sm flex gap-1 items-center justify-end w-full">
                  {pathname === item.href && <span className="ml-2">{item.icon}</span>}
                  {pathname !== item.href && <span className="opacity-0 group-hover:opacity-100 duration-300">{item.icon}</span>}
                  <p>{item.name}</p>
                  
                </button>
              </Link>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavBar;
