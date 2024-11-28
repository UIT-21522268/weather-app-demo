import React from 'react'
import Container from './Container'
import WeatherIcon from './WeatherIcon'
import { WeatherDetailProps } from './WeatherDetail'
import WeatherDetail from './WeatherDetail'
type Props = {}
export interface ForecastWeatherDetailProps extends WeatherDetailProps{
    weatherIcon: string;
    date: string;
    day: string;
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    description: string;
}
export default function ForecastWeatherDetail(props: ForecastWeatherDetailProps) {
  return (
    <Container className='gap-4'>
        {/* left */}
        <section className='flex gap-4 items-center px-4'>
            <WeatherIcon iconname={props.weatherIcon} />
            <p className='text-lg'>{props.date}</p>
            <p className='text-md'>{props.day}</p>
            {/*  */}
            <div className="flex flex-col px-4">
                <p className='text-5xl'>{Math.floor(props?.temp ?? 0)}°{}</p>
                <p className='text-sm text-nowrap'>Feels like {Math.floor(props?.feels_like ?? 0)}°</p>
                <h3 className='capitalize'>{props.description}</h3>
            </div>
        </section>
        {/* RIGHT */}
        <section className='flex gap-4 overflow-x-auto w-full justify-between px-5 bg-[#91cfec]'>
            <WeatherDetail {...props}
            />
        </section>
    </Container>
  )
}