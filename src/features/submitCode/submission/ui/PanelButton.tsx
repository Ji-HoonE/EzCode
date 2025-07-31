'use client';
import clsx from 'clsx';
import { Mode } from './ProblemWorksSection';

interface IPanelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  currentMode: Mode;
  targetMode: Mode;
  children: React.ReactNode;
  text: string;
}
export default function PanelButton({ ...props }: IPanelButtonProps) {
  const { currentMode, targetMode, onClick, children, text, ...rest } = props;
  return (
    <button
      onClick={onClick}
      className={clsx(
        'transition-all flex space-x-2 items-center px-3 py-1.5 rounded-md',
        currentMode === targetMode
          ? 'bg-primary text-white'
          : 'text-[#ccc] hover:bg-[rgba(255,255,255,0.08)] hover:text-secondary'
      )}
      {...rest}
    >
      {children}
      <p>{text}</p>
    </button>
  );
}
