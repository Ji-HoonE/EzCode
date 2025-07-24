import clsx from 'clsx';
import { ReactNode } from 'react';
import { defaultInput } from './unifiedInput.default.style';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  rightSlot?: ReactNode;
}

export default function InputTypeFiled({ onChange, className, rightSlot, ...props }: Props) {
  return (
    <div className="flex items-center gap-2 rounded-[10px] md:gap-2.5">
      <input
        placeholder={props.placeholder}
        onChange={onChange}
        {...props}
        className={clsx('h-[58px] rounded-md', defaultInput, className)}
      />
      {rightSlot && <>{rightSlot}</>}
    </div>
  );
}
