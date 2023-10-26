import TechRiderSettings from '@/components/admin/tech-rider/tech-rider-settings'
import React from 'react'

interface TechRiderPageProps {
    params: {
        artistId: string;
    }
}

const TechRiderPage = async (props: TechRiderPageProps) => {
    const { params } = props;
    const { artistId } = params;

    return (
        <div>
            <TechRiderSettings artistId={artistId} />
        </div>
    )
}

export default TechRiderPage
