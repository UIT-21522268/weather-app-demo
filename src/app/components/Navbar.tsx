'use client'
import React, { useState } from 'react'
import { TiWeatherPartlySunny } from "react-icons/ti";
import { GrMapLocation } from "react-icons/gr";
import { GrLocation } from "react-icons/gr";
import SearchBox from './Searchbar/Searchbar';
import axios from 'axios';
import { useAtom } from 'jotai';
import { placeAtom } from '../atom';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Props = {}

export default function Navbar({ }: Props) {
    const[city,setCity]= useState("");
    const[error,setError]= useState(""); //error message
    const APIkey = process.env.NEXT_PUBLIC_WEATHER_KEY; //API key
    const[suggestions,setSuggestions]= useState<string[]>([]); //suggestions list
    const[showSuggestions,setShowSuggestions]= useState(false); //show suggestion list
    const [place, setPlace] = useAtom(placeAtom);

    

    async function handleInputChange(value: string){
        setCity(value);
        if(value.length >= 3){
            try{
                const response = await axios.get(`https://api.openweathermap.org/data/3.0/find?q=${value}&units=metric&appid=${APIkey}`);
                const suggestions = response.data.list.map((item : any )=> item.name);
                setSuggestions(suggestions);
                setError("");
                setShowSuggestions(true);
            }       
            catch(error){
                setSuggestions([]);
                setShowSuggestions(false);
            };
    }   else {
        setSuggestions([]); 
        setPlace(value);
        setShowSuggestions(false);
    }
    }
    function handleSuggestionClick(value: string) {
        setCity(value);
        setShowSuggestions(false);
      }
    function handleSubmitSearch(e: React.FormEvent<HTMLFormElement>) {
            e.preventDefault();
            if(suggestions.length == 0){
                setError("No location found. Try again");
                setTimeout(() => {
                    setError("");
                  }, 3000); //biến mất sau 3 giây
                
            }
            else {
                setError("");
                setShowSuggestions(false);
            }
    }

    return (
        <>
            <nav className="shadow-sm  sticky top-0 left-0 z-50 bg-white">
                <div className="h-[70px]     w-full    flex   justify-between items-center  max-w-7xl px-10 mx-auto">
                    <div className="flex items-center justify-center gap-2  ">
                        <h2 className="text-[#06D7A0] text-3xl">Weather  </h2>
                        <TiWeatherPartlySunny className='text-3xl text-yellow-300 mt-1' />
                    </div>
                    <section className="flex items-center  gap-5  ">
                        <GrMapLocation className='text-2xl mt-1 hover:opacity-60 cursor-pointer' />
                        <GrLocation className='text-2xl mt-1 hover:opacity-60 cursor-pointer' />
                        <p className='text-[#073A4B] text-sm font-medium '>BMT</p>
                        <div>
                        <SearchBox 
                            value={city}
                            onChange ={(e)=>handleInputChange(e.target.value)}
                            onSubmit={handleSubmitSearch}
                        
                        /></div>
                        <SuggetionBox
                             {...{
                                showSuggestions,
                                suggestions,
                                handleSuggestionClick,
                                error
                              }}
                        />
                    </section>

                </div>
            </nav>
        </>
    )
}

function SuggetionBox({
    showSuggestions,
    suggestions,
    handleSuggestionClick,
    error
  }: {
    showSuggestions: boolean;
    suggestions: string[];
    handleSuggestionClick: (item: string) => void;
    error: string;
  }) {
    return (
      <>
        {((showSuggestions && suggestions.length > 1) || error) && (
          <ul className="absolute bg-white border border-gray-300 rounded-md min-w-[230px] top-full right-5 mt-2 py-2 px-2 shadow-md">
            {error && suggestions.length < 1 && (
              <li className="text-red-500 p-1 "> {error}</li>
            )}
            {/* mb-4 bg-white absolute border top-[44px] right-0 border-gray-300 rounded-md min-w-[200px]  flex flex-col gap-1 py-2 px-2 */}
            {suggestions.map((item, i) => (
              <li
                key={i}
                onClick={() => handleSuggestionClick(item)}
                className="cursor-pointer p-1 rounded   hover:bg-gray-200"
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }