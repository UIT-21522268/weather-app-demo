import React from 'react'
import { FaEye } from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";
import { FaWind } from "react-icons/fa";
import { FaTachometerAlt } from "react-icons/fa";
import { FiSunrise } from "react-icons/fi";
import { LuSunset } from "react-icons/lu";
type Props = {}
export interface WeatherDetailProps {
    visability: string;
    humidity: string;
    windSpeed: string;
    airPressure: string;
    sunrise: string;
    sunset: string;
}
export default function WeatherDetail(props: WeatherDetailProps) {
  return (
    <>
    <SingleWeather
        icon={<FaEye />}
        information='Visability'
        value={props.visability}
    />
    <SingleWeather
        icon={<FaDroplet />}
        information='Humidity'
        value={props.humidity}
    />
    <SingleWeather
        icon={<FaWind />}
        information='Wind Speed'
        value={props.windSpeed}
    />
    <SingleWeather
        icon={<FaTachometerAlt />}
        information='Air Pressure'
        value={props.airPressure}
    />
    <SingleWeather
        icon={<FaWind />}
        information='Sun Rise'
        value={props.sunrise}
    />
    <SingleWeather
        icon={<FiSunrise />}
        information='Sun Rise'
        value={props.sunrise}
    />
    <SingleWeather
        icon={<LuSunset />}
        information='Sun Set'
        value={props.sunset}
    />
    </>
  )
}
export interface SingleWeatherProps {
    information : string,
    value : string,
    icon: React.ReactNode
}

function SingleWeather(props: SingleWeatherProps) {
    return (
        <div className="flex flex-col items-center justify-between gap-2 font-semibold text-xs text-black/80">
           <p className='whitespace-nowrap'>{props.information}</p>
           <div className="text-3xl">{props.icon}</div>
           <p>{props.value}</p>
            
        </div>
    )
}