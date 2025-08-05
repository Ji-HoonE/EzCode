import { twMerge } from 'tailwind-merge';

interface ArrowIconProps {
  direction: 'left' | 'right' | 'up' | 'down';
  className?: string;
}
export default function Arrow({ direction = 'down', className }: ArrowIconProps) {
  const d =
    direction === 'up'
      ? 'rotate-180'
      : direction === 'left'
        ? 'rotate-90'
        : direction === 'right'
          ? 'rotate-270'
          : '';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge(
        'lucide lucide-chevron-down h-4 w-4 opacity-50 transition-transform duration-200',
        d,
        className
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
  );
}
