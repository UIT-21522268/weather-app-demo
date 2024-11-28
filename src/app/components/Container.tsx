/** @format */
import React from 'react';

const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

// Container chứa các thông tin về thời tiết
interface ContainerProps extends React.HTMLProps<HTMLDivElement> {
  color?: string; // Prop để chỉ định màu nền
}

export default function Container({ color = 'bg-[#e1e1e1]', className, ...props }: ContainerProps) {
  return (
    <div
      {...props}
      className={cn(
        color, // Sử dụng màu từ prop hoặc giá trị mặc định
        "rounded-xl shadow-xl flex py-3 border",
        className || ''
      )}
    />
  );
}
