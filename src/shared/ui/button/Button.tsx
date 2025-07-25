'use client';
import Link from 'next/link';
import { ButtonHTMLAttributes, ReactNode, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface PropsType extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'default' | 'danger' | 'outline';
  onClick?: () => void | Promise<void>;
  href?: string;
  size?: 'sm' | 'md' | 'lg';
  rounded?: 'sm' | 'md' | 'lg' | 'full';
  fullWidth?: boolean;
  loading?: boolean;
  icon?: ReactNode;
}

export const Button = ({
  label,
  className = '',
  variant = 'primary',
  onClick,
  size = 'md',
  rounded = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon,
  href,
  type = 'button',
  ...rest
}: PropsType) => {
  const [internalLoading, setInternalLoading] = useState(false);
  const isLoading = loading || internalLoading;

  const handleClick = async () => {
    if (isLoading || !onClick) return;
    setInternalLoading(true);
    try {
      await onClick();
    } finally {
      setInternalLoading(false);
    }
  };
  const variantStyles: Record<NonNullable<PropsType['variant']>, string> = {
    primary: 'bg-[#214d35] text-white hover:bg-[#276e48] active:bg-[#1e3e2c]',
    secondary: 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700',
    default: 'bg-gray-300 text-black hover:bg-gray-400 active:bg-gray-500',
    danger: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700',
    outline: 'bg-transparent border border-gray-300 text-black hover:bg-gray-100',
  };

  const sizeStyles: Record<NonNullable<PropsType['size']>, string> = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-5 py-3',
  };

  const roundedStyles: Record<NonNullable<PropsType['rounded']>, string> = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  const baseStyle =
    'inline-flex items-center justify-center font-medium active:scale-[0.98] transition-all duration-200 shadow hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed';

  const mergedClassName = twMerge(
    baseStyle,
    variantStyles[variant],
    sizeStyles[size],
    roundedStyles[rounded],
    fullWidth ? 'w-full' : '',
    className
  );

  if (href) {
    return (
      <Link href={href} className={mergedClassName}>
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {label}
        </>
      </Link>
    );
  } else {
    return (
      <button
        {...rest}
        type={type}
        disabled={disabled || isLoading}
        className={mergedClassName}
        onClick={handleClick}
      >
        {isLoading ? (
          <span className="animate-pulse">처리 중...</span>
        ) : (
          <>
            {icon && <span className="mr-2">{icon}</span>}
            {label}
          </>
        )}
      </button>
    );
  }
};
