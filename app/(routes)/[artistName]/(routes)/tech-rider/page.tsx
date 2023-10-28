import TechRiderGrid from '@/components/presskit/tech-rider/tech-rider-grid'
import React from 'react'

interface Props {
    
}

const TechRidePage = (props: Props) => {
    return (
        <div className='max-w-[900px] p-9 lg:p-0 pt-16'>
            <TechRiderGrid />
        </div>
    )
}

export default TechRidePage
