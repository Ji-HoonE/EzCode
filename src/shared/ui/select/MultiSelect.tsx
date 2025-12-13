'use client';

import { HTMLAttributes, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { OptionType } from './Select';

/**
 * MultiSelect 컴포넌트의 props
 */
interface MultiSelectProps extends HTMLAttributes<HTMLDivElement> {
  option: OptionType[];

  title: string;

  className?: string;

  setValue?: (values: string[]) => void;

  value: string[];

  size?: 'sm' | 'md' | 'lg';

  initialValue?: string;

  placeholder?: string;
}

export const MultiSelect = ({
  option,
  className,
  setValue,
  value = [],
  size = 'md',
  id,
  initialValue = '',
  placeholder = '선택해주세요',
  ...rest
}: MultiSelectProps & { id?: string }) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const [dropdown, setDropdown] = useState(false);

  const sizeMap = {
    sm: 'h-8 text-xs w-30 px-4',
    md: 'h-12 text-sm w-60 px-4',
    lg: 'h-15 text-base w-100 px-4',
  };
  const sizeClass = sizeMap[size];

  // 선택된 옵션들의 라벨 찾기
  const selectedOptions = option.filter(
    (opt) => typeof opt.value === 'string' && value.includes(opt.value)
  );

  // 버튼에 표시할 텍스트
  const getDisplayText = () => {
    if (value.length === 0) {
      return initialValue || placeholder;
    }
    if (value.length === 1) {
      return selectedOptions[0]?.label || '';
    }
    return `${value.length}개 선택됨`;
  };

  // 옵션 토글 핸들러
  const handleToggleOption = (optionValue: string) => {
    if (!setValue) return;

    const newValues = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue) // 제거
      : [...value, optionValue]; // 추가

    setValue(newValues);
  };

  // 전체 선택/해제 핸들러
  const handleSelectAll = () => {
    if (!setValue) return;
    const allStringValues = option
      .map((opt) => (typeof opt.value === 'string' ? opt.value : null))
      .filter((v): v is string => v !== null);

    if (value.length === allStringValues.length) {
      // 모두 선택되어 있으면 모두 해제
      setValue([]);
    } else {
      // 모두 선택
      setValue(allStringValues);
    }
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

  const allSelected =
    value.length > 0 &&
    value.length === option.filter((opt) => typeof opt.value === 'string').length;

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
        <span className="truncate">{getDisplayText()}</span>
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
          'max-h-[300px] w-full overflow-y-auto absolute top-14 flex flex-col bg-gray-800 border border-gray-700 rounded z-10 transition-all duration-200 origin-top',
          dropdown ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        )}
      >
        {/* 전체 선택 옵션 */}
        <div
          className="flex flex-row gap-2 items-center justify-start py-2 hover:bg-white/8 text-[#ccc] cursor-pointer transition-all duration-200 hover:text-[#00d084]"
          onClick={handleSelectAll}
        >
          <span
            className={twMerge('ml-3 w-4 text-left')}
            style={{
              color: allSelected ? '#00d084' : undefined,
            }}
          >
            {allSelected && '✔'}
          </span>
          <span
            className="text-left"
            style={{
              color: allSelected ? '#00d084' : undefined,
            }}
          >
            전체 선택
          </span>
        </div>

        {/* 옵션 리스트 */}
        {option.map((item) => {
          if (typeof item.value !== 'string') {
            return null;
          }

          const itemValue = item.value;
          const isSelected = value.includes(itemValue);

          return (
            <div
              key={itemValue}
              className="flex flex-row gap-2 items-center justify-start py-2 hover:bg-white/8 text-[#ccc] cursor-pointer transition-all duration-200 hover:text-[#00d084]"
              onClick={() => {
                handleToggleOption(itemValue);
              }}
            >
              <span
                className={twMerge('ml-3 w-4 text-left')}
                style={{
                  color: isSelected ? '#00d084' : undefined,
                }}
              >
                {isSelected && '✔'}
              </span>
              <span
                className="text-left"
                style={{
                  color: isSelected ? '#00d084' : undefined,
                }}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MultiSelect;
