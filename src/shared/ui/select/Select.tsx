'use client';

import { useRouter } from 'next/navigation';
import { HTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
export interface OptionType {
  label: ReactNode;
  value: string | (() => void); // router면 string, api면 함수
}
/**
 * Select 컴포넌트의 props
 */
interface PropsType extends HTMLAttributes<HTMLDivElement> {
  /**
   * Select에 표시할 옵션 배열
   * - label: 보여줄 텍스트나 이미지 (ReactNode)
   * - value: 선택될 값 (string 또는 함수 - api일 경우)
   */
  option: OptionType[];

  /** Select 기본 표시 텍스트 */
  title: string;

  /** Tailwind 등 추가 클래스 */
  className?: string;

  /** 선택된 값을 상위에서 관리할 때 사용하는 setter */
  setValue?: (value: string) => void;

  /** 현재 선택된 값 */
  value: string | ReactNode;

  /** 컴포넌트 사이즈 (기본값: 'md') */
  size?: 'sm' | 'md' | 'lg';

  /**
   * 동작 타입
   * - 'setValue': value를 상태로 반영 (기본)
   * - 'router': next/router로 이동
   * - 'api': value가 함수일 경우 호출
   */
  type?: 'setValue' | 'router' | 'api';
}
interface PropsType extends HTMLAttributes<HTMLDivElement> {
  option: OptionType[];
  title: string;
  className?: string;
  setValue?: (value: string) => void;
  value: string | ReactNode;
  size?: 'sm' | 'md' | 'lg';
  type?: 'setValue' | 'router' | 'api';
  entireOption?: boolean;
  isHeader?: boolean;
  initialValue?: string;
}

export const Select = ({
  option,
  className,
  setValue,
  value,
  size = 'md',
  type = 'setValue',
  entireOption = false,
  id,
  isHeader = false,
  initialValue = '',
  ...rest
}: PropsType & { id?: string }) => {
  const router = useRouter();
  const selectRef = useRef<HTMLDivElement>(null);
  const [dropdown, setDropdown] = useState(false);
  const sizeMap = {
    sm: 'h-8 text-xs w-30 px-4',
    md: 'h-12 text-sm w-60 px-4',
    lg: 'h-15 text-base w-100 px-4',
  };
  const sizeClass = sizeMap[size];
  const selectedOption =
    typeof value === 'string'
      ? option.find((opt) => typeof opt.value === 'string' && opt.value === value)
      : null;

  const handleSelectChange = (value: string | (() => void)) => {
    // type 분기
    if (type === 'setValue') {
      if (typeof value === 'string' && setValue) {
        setValue(value);
      }
    } else if (type === 'router') {
      if (typeof value === 'string') {
        router.push(value);
      }
    } else if (type === 'api') {
      if (typeof value === 'function') {
        value(); // 함수 실행
      }
    }
    setDropdown(false);
  };

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
        id={id}
        onClick={() => {
          setDropdown((prev) => !prev);
        }}
        className={twMerge(
          `dropdown-trigger relative w-[100px] flex items-center justify-between rounded-md border bg-gray-800 border-gray-700 text-white ${sizeClass} ${className}`
        )}
        aria-expanded={dropdown}
      >
        <span className="truncate">
          {typeof value === 'string' ? selectedOption?.label || initialValue || '전체' : value}
        </span>
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
          'max-h-[300px] w-full overflow-y-auto absolute top-14 flex flex-col bg-gray-800 border border-gray-700 rounded  z-10 transition-all duration-200 origin-top ',
          dropdown ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        )}
      >
        {entireOption && (
          <div
            className="flex flex-row gap-2 items-center px-1 hover:bg-white hover:text-black cursor-pointer py-1 rounded "
            onClick={() => {
              if (setValue) setValue('');
              setDropdown(false);
            }}
          >
            <span className="ml-5 w-3">{'' === value && '✔'}</span>
            <span className=" ">전체</span>
          </div>
        )}
        {option.map((item, index) => (
          <div
            key={typeof item.value === 'string' ? item.value : `option-${index}`}
            className="flex flex-row gap-2 items-center justify-start py-2 hover:bg-white/8 text-[#ccc] cursor-pointer transition-all duration-200 hover:text-[#00d084]"
            onClick={() => {
              handleSelectChange(item.value);
            }}
          >
            {!isHeader && (
              <span
                className={twMerge('ml-3 w-4 text-left')}
                style={{
                  color:
                    typeof item.value === 'string' && item.value === value ? '#00d084' : undefined,
                }}
              >
                {typeof item.value === 'string' && item.value === value && '✔'}
              </span>
            )}

            <span
              className={twMerge(isHeader ? 'flex-1 text-center' : 'text-left')}
              style={{
                color:
                  typeof item.value === 'string' && item.value === value ? '#00d084' : undefined,
              }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
