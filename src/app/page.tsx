'use client'
import WeatherDetail from "./components/WeatherDetail";
import {getDayorNightIcon} from "./ultis/getDayorNightIcon";
import Navbar from "./components/Navbar";
import Loader from "./components/Loading";
import WeatherIcon from "./components/WeatherIcon";
import {meterToKilometer} from "./ultis/meterToKm";
import ForecastWeatherDetail from "./components/ForecastWeatherDetail";
import Fab from '@mui/material/Fab';
import GitHubIcon from '@mui/icons-material/GitHub';
import {

  useQuery
} from '@tanstack/react-query'
import axios from "axios";
import Container from "./components/Container";

interface WeatherData {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: CurrentWeather;
  hourly: HourlyWeather[];
  daily: DailyWeather[]; // Thêm vào dữ liệu daily
}

interface CurrentWeather {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  weather: WeatherCondition[];
  rain?: RainData;
}

interface HourlyWeather {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
  weather: WeatherCondition[];
  pop: number;
  rain?: RainData;
}

interface DailyWeather {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  summary: string; // Mô tả ngắn về thời tiết trong ngày
  temp: DailyTemperature;
  feels_like: DailyFeelsLike;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
  weather: WeatherCondition[];
  clouds: number;
  pop: number; // Xác suất mưa
  rain?: number; // Lượng mưa (nếu có)
  uvi: number; // Chỉ số UV
}

interface DailyTemperature {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

interface DailyFeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface RainData {
  "1h": number;
}





//https://api.openweathermap.org/data/3.0/onecall?lat=10.762622&lon=106.660172&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}
//https://api.openweathermap.org/data/3.0/onecall?lat=10.762622&lon=106.660172&appid=d2c2c7720275533fa94738ce5ff0cd91
//thoi tiet tphcm
export default function Home() {
  const { isPending, error, data } = useQuery<WeatherData>({
    queryKey: ['repoData'],
    queryFn: async () => { //35:38 
      const { data } = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=10.762622&lon=106.660172&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`);
      return data;
    }
  });
  const currentWeather = data?.current;
 
  const uniqueDates = [
    ...new Set(
      data?.daily.map(
        (entry) => new Date(entry.dt * 1000).toISOString().split('T')[0] // Lấy ngày
      )
    )
  ];

  const firstDataDate = uniqueDates.map( (date) => {
      return data?.daily.find((entry) => {
          const entryDate = new Date(entry.dt * 1000).toISOString().split('T')[0];
          const entryTime = new Date(entry.dt * 1000).getHours();
          return entryDate === date && entryTime >= 6;
      });
});
  //console.log('weather',data?.current.weather[0].description);
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
    );
    
  }
  // Hàm chuyển đổi timestamp từ dt sang GMT +7 và định dạng ngày tháng
  const formatDateWithDay = (timestamp: number) => {
    const gmt7Offset = 7 * 3600; // Độ lệch GMT+7 (giây)
    const localDate = new Date((timestamp + gmt7Offset) * 1000); // Chuyển đổi timestamp
    // Lấy các phần của ngày
 
    const day = String(localDate.getUTCDate()).padStart(2, '0');
    const month = String(localDate.getUTCMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = localDate.getUTCFullYear();

    return `(${day}.${month}.${year})`;
};
  const formatDate = (timestamp: number) => {
    const gmt7Offset = 7 * 3600; // Độ lệch GMT+7 (giây)
    const localDate = new Date((timestamp + gmt7Offset) * 1000); // Chuyển đổi timestamp
    // Lấy các phần của ngày
 
    const day = String(localDate.getUTCDate()).padStart(2, '0');
    const month = String(localDate.getUTCMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    

    return `${day}.${month}`;
};
const getdayOfWeek = (timestamp: number) => {
  const gmt7Offset = 7 * 3600; // Độ lệch GMT+7 (giây)
  const localDate = new Date((timestamp + gmt7Offset) * 1000); // Chuyển đổi timestamp

  // Mảng tên ngày
  const daysOfWeek = [
      "Chủ Nhật",
      "Thứ Hai",
      "Thứ Ba",
      "Thứ Tư",
      "Thứ Năm",
      "Thứ Sáu",
      "Thứ Bảy",
  ];

  // Lấy các phần của ngày
  const dayOfWeek = daysOfWeek[localDate.getUTCDay()]; // Lấy tên thứ
  return `${dayOfWeek}`;
};
//bg-gray-100
  if (error) return 'An error has occurred: ' + error.message;
  return (
    //https://api.openweathermap.org/data/2.5/weather?q=London&appid=127ea425bde1d0716b95f62732f7f9b7&cnt=56
    //https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&appid=127ea425bde1d0716b95f62732f7f9b7
    
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
      <Fab   
        color="primary"
        size="small"
        sx={{ 
          position: 'fixed', 
          bottom: 16, 
          right: 10,
          backgroundColor: '#000000',
          
        }}
        href="https://github.com/UIT-21522268/weather-app-demo"
      > 
        <GitHubIcon />
      </Fab>
      <main className="px-9 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        {/* today*/}
        <section>
           
            <h2 className="flex text-lg  gap-1 items-end py-4">
              <p className="text-3xl text-[#F78C6A]">{currentWeather?.dt ? getdayOfWeek(currentWeather.dt) : "N/A"}</p>
              <p className="text-[#FFD167]">{currentWeather?.dt ? formatDateWithDay(currentWeather.dt) : "N/A"}</p> 
              {/* 51:07 */}
            </h2>
            <Container className="gap-10 px-6 items-center w-full">
               <div className="flex flex-col gap-0 items-center content-center "> 
                  <div className="text-5xl pl-3">{Math.floor(currentWeather?.temp ?? 0)}°</div>
                  <div className="text-sm">Feels like {Math.floor(currentWeather?.feels_like ?? 0)}°</div>
                  <p className="text-xs space-x-2">
                    <span className="text-[#F04770] font-medium">{Math.floor(data.daily[0].temp.max)}↑°</span>
                    <span className="text-[#108AB1] font-medium">{Math.floor(data.daily[0].temp.min)}↓°</span>
                  </p>
               </div>
               {/* time and weather icon */}
               <div className="flex  gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                  {data.hourly.map((d,i)=>(
                     <div 
                     key = {i}
                     className="flex flex-col justify-between gap-2 items-center text-xs font-semibold">
                        <p className="text-nowrap">
                        {new Date(d.dt * 1000).toLocaleTimeString('vi-VI', {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true,
                        })}
                        </p>
                        {/* <WeatherIcon iconname={data.hourly?.[i]?.weather?.[0]?.icon} /> */}
                       <WeatherIcon iconname={getDayorNightIcon(data.hourly?.[i]?.weather?.[0]?.icon,data.hourly?.[i]?.dt ? String(data.hourly?.[i]?.dt * 1000) : '' )} /> 
                        <p>{Math.floor(data.hourly[i].temp)}°</p>
                        
                     </div>
                  ))}
               </div>
            </ Container>
            <div className="flex gap-4 mt-6">
                  {/* left */}
                  <Container className="w-fit justify-center items-center flex-col ">
                      <div className="text-lg px-7 capitalize text-nowrap">{data?.current.weather[0].description}</div>
                      <WeatherIcon iconname={getDayorNightIcon(data.hourly?.[0]?.weather?.[0]?.icon,data.hourly?.[0]?.dt ? String(data.hourly?.[0]?.dt ) : '' )} />
                  </Container>
                  {/* right */}
                  <Container className=" gap-6 sm:gap-16 overflow-x-auto w-full justify-between px-5 " color="bg-[#91cfec]">
                      <WeatherDetail visability={meterToKilometer(data.current.visibility)} humidity={`${data.current.humidity}%`}  
                              windSpeed={`${data.current.wind_speed} km/h`}  airPressure={`${data.current.pressure}hPa`} 
                              sunrise= {new Date(data.current.sunrise * 1000).toLocaleTimeString('vi-VI', {   
                                      hour: '2-digit',
                                      minute: '2-digit',
                                      hour12: true,
                                    })}  
                              sunset= {new Date(data.current.sunset * 1000).toLocaleTimeString('vi-VI', {   
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true,
                              })}  
                              
                              />
                  </Container>
            </div>
        </section>
        {/* forecast 7 days */}
        <section className="flex w-full flex-col gap-4 mt-3">
          <h2 className="text-3xl text-[#F78C6A]">7-Day Forecast</h2>
          {firstDataDate.map((d,i)=>(
              <ForecastWeatherDetail 
                key= {i}
                description={d?.weather?.[0]?.description ?? ''}
                weatherIcon={d?.weather?.[0]?.icon ?? ''}
                date ={formatDate(d?.dt ?? 0)} 
                day = {getdayOfWeek(d?.dt ?? 0)}
                feels_like={d?.feels_like?.day ?? NaN}
                temp={d?.temp?.day ?? 0}
                temp_min={d?.temp?.min ?? 0}
                temp_max={d?.temp?.max ?? 0}
                airPressure={`${d?.pressure ?? 0} hPa`}
                humidity={`${d?.humidity ?? 0}%`}
                windSpeed={`${d?.wind_speed ?? 0} km/h`}
                sunrise={new Date(d?.sunrise ?? 0).toLocaleTimeString('vi-VI', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })}
                sunset={new Date(d?.sunset ?? 0).toLocaleTimeString('vi-VI', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })}
                visability={meterToKilometer(data.current.visibility ?? 10000)}
                
                
              
              /> 
          ))}
        </section>
       
      </main>
    </div>


  );
}


