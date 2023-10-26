'use client'

import { useArtistEvents, useArtistReleases, useArtistTechRider, useSelectedArtist } from '@/state/selected-artist';
import { Artist, Event, Release, TechRider } from '@prisma/client'
import React from 'react'

interface Props {
    artist: Artist
    dataReleases: Release[]
    dataEvents: Event[]
    dataTechRider: TechRider
}

const ArtistSetter = (props: Props) => {

    const { artist, dataReleases, dataEvents, dataTechRider } = props;
    const { selectedArtist, setSelectedArtist } = useSelectedArtist();
    const { releases, setReleases } = useArtistReleases();
    const { events, setEvents } = useArtistEvents();
    const { techRider, setTechRider } = useArtistTechRider();


    if (artist) {
        if (selectedArtist?.id !== artist.id) {
            setSelectedArtist(artist)
            setReleases(dataReleases)
            setEvents(dataEvents)
            setTechRider(dataTechRider)
        }
    } else {
        return null
    }

    return null
}

export default ArtistSetter
