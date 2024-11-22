/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from 'next/image'
import React from 'react'


// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Props = {}
function WeatherIcon(props: React.HTMLProps<HTMLDivElement> & {iconName: string}) {
    return (
        <div {...props} style={{ position: 'relative', height: '5rem', width: '5rem' }}>
                <Image 
                width={100}
                height={100}
                alt='weather-icon'
                style={{ position: 'absolute', width: '100%', height: '100%' }}
                src={`https://openweathermap.org/img/wn/${props.iconName}@4x.png`}/>
        </div>
    )
}

export default WeatherIcon