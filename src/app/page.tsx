'use client'

import Image from "next/image";
import Navbar from "./components/Navbar";
import Loader from "./components/Loading";
import {

  useQuery
} from '@tanstack/react-query'
import axios from "axios";
type WeatherData = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

export default function Home() {
  const { isPending, error, data } = useQuery<WeatherData>({
    queryKey: ['repoData'],
    queryFn: async () => { //35:38 
      const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`);
      return data;


    }
  });
  console.log('data:', data?.name);
  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="relative">
          {/* <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
           <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-green-500 animate-spin">
           </div> */}
          <Loader />
        </div>
      </div>

    );//load trang
    return (
      <div className="px-3 max-w-7xl mx-auto flex flex-col gap9 w-full pb-10 pt-4">
        <Navbar />
      </div>
    );
  }

  if (error) return 'An error has occurred: ' + error.message;
  return (
    //https://api.openweathermap.org/data/2.5/weather?q=London&appid=d2c2c7720275533fa94738ce5ff0cd91&cnt=56


    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        {/* today*/}
        <section></section>
        <section></section>
        <section></section>
        <section></section>
      </main>
    </div>


  );
}
