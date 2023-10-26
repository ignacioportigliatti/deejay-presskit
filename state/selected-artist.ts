import { Artist, Event, Prisma, Release, TechRider } from "@prisma/client";
import { create } from "zustand";

interface SelectedArtistState {
    selectedArtist: Artist | null;
    setSelectedArtist: (artist: Artist) => void;
}

interface ArtistReleasesState {
    releases: Release[];
    setReleases: (releases: Release[]) => void;
}

interface ArtistEventsState {
    events: Event[];
    setEvents: (events: Event[]) => void;
}

export interface ArtistTechRiderState {
    techRider: ArtistTechRider;
    setTechRider: (techRider: ArtistTechRider) => void;
}

type TechRiderObject = {
    brand: string;
    models: string[];
  }

export interface ArtistTechRider {
    id: string;
    artistId: string;
    cdPlayers: TechRiderObject[];
    mixers: TechRiderObject[];
    turntables: TechRiderObject[];
}

export const useArtistEvents = create<ArtistEventsState>((set) => ({
    events: [],
    setEvents: (events) => set({ events }),
}))

export const useArtistReleases = create<ArtistReleasesState>((set) => ({
    releases: [],
    setReleases: (releases) => set({ releases }),
}))

export const useArtistTechRider = create<ArtistTechRiderState>((set) => ({
    techRider: {
        id: "",
        artistId: "",
        cdPlayers: [],
        mixers: [],
        turntables: [],
    },
    setTechRider: (techRider) => set({ techRider }),
}))

export const useSelectedArtist = create<SelectedArtistState>((set) => ({
    selectedArtist: null,
    setSelectedArtist: (artist) => set({ selectedArtist: artist }),
})) 