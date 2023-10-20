'use client'

import { useArtistEvents, useArtistReleases, useSelectedArtist } from '@/state/selected-artist';
import { Artist, Event, Release } from '@prisma/client'
import React from 'react'

interface Props {
    artist: Artist
    dataReleases: Release[]
    dataEvents: Event[]
}

const ArtistSetter = (props: Props) => {

    const { artist, dataReleases, dataEvents } = props;
    const { selectedArtist, setSelectedArtist } = useSelectedArtist();
    const { releases, setReleases } = useArtistReleases();
    const { events, setEvents } = useArtistEvents();


    if (artist) {
        if (selectedArtist?.id !== artist.id) {
            setSelectedArtist(artist)
            setReleases(dataReleases)
            setEvents(dataEvents)
        }
    } else {
        return null
    }

    return null
}

export default ArtistSetter
