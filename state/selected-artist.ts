import { Artist, Event, Release } from "@prisma/client";
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

export const useArtistEvents = create<ArtistEventsState>((set) => ({
    events: [],
    setEvents: (events) => set({ events }),
}))

export const useArtistReleases = create<ArtistReleasesState>((set) => ({
    releases: [],
    setReleases: (releases) => set({ releases }),
}))

export const useSelectedArtist = create<SelectedArtistState>((set) => ({
    selectedArtist: null,
    setSelectedArtist: (artist) => set({ selectedArtist: artist }),
})) 