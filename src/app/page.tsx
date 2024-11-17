import Image from "next/image";
import Navbar from "./components/Navbar";

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
  return (
    //https://api.openweathermap.org/data/2.5/weather?q=London&appid=d2c2c7720275533fa94738ce5ff0cd91&cnt=56


    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
    </div>


  );
}
