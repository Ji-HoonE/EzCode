'use client';

import { HTMLAttributes, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface PropsType extends HTMLAttributes<HTMLDivElement> {
  option: { label: string; value: string }[];
  title: string;
  className?: string;
  setValue: (value: string) => void;
  value: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Select = ({
  option,
  title,
  className,
  setValue,
  value,
  size = 'md',
  ...rest
}: PropsType) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const [dropdown, setDropdown] = useState(false);
  const sizeMap = {
    sm: 'h-8 text-xs w-30 px-4',
    md: 'h-12 text-sm w-60 px-4',
    lg: 'h-15 text-base w-100 px-4',
  };
  const sizeClass = sizeMap[size];
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={selectRef} {...rest}>
      <button
        onClick={() => {
          setDropdown((prev) => !prev);
        }}
        className={twMerge(
          `dropdown-trigger relative w-[100px] flex items-center justify-between rounded-md border bg-gray-800 border-gray-700 text-white ${sizeClass} ${className}`
        )}
        aria-expanded={dropdown}
      >
        <span className="truncate">{value || title}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={twMerge(
            'lucide lucide-chevron-down h-4 w-4 opacity-50 transition-transform duration-200',
            dropdown && 'rotate-180'
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div
        className={twMerge(
          'max-h-[300px] w-full overflow-y-auto absolute top-11 flex flex-col bg-gray-800 border border-gray-700 rounded  z-10 transition-all duration-200 origin-top ',
          dropdown ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        )}
      >
        <div
          className="flex flex-row gap-2 items-center px-1 hover:bg-white hover:text-black cursor-pointer py-1 rounded "
          onClick={() => {
            setValue('');
            setDropdown(false);
          }}
        >
          <span className="ml-5 w-3">{'' === value && '✔'}</span>
          <span className=" ">전체</span>
        </div>
        {option.map((item) => (
          <div
            key={item.value}
            className="flex flex-row gap-2 items-center px-1 hover:bg-white hover:text-black cursor-pointer py-1 rounded "
            onClick={() => {
              setValue(String(item.value)); // string으로 강제 형변환
              setDropdown(false);
            }}
          >
            <span className="ml-5 w-3">{item.value === value && '✔'}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
