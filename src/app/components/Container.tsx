/** @format */
import React from 'react'
// import cn from '@utils/cn'; // Ensure this module exists or replace it with an alternative
const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

//container chứa các thông tin về thời tiết 
export default function Container(props: React.HTMLProps<HTMLDivElement>) {
  return (
    <div
    {...props}
    className={cn("w-full rounded-xl shadow-xl bg-white flex py-3 border", 
        props.className || '')}
        />
    
  
  );
} 