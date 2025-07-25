import clsx from 'clsx';
import { ReactNode } from 'react';
import * as S from './unifiedInput.default.style';
import { IInputTypeFiledStatus } from '@/shared/hooks/UnifiedInput/useInputTypeFiledStatus';

interface IInputTypeFiledProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    IInputTypeFiledStatus {
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
}

export default function InputTypeFiled({ className, ...props }: IInputTypeFiledProps) {
  const { isFocused, isTouched, showSuccess, handleFocus, handleBlur, ...rest } = props;

  return (
    <div
      className={clsx(S.defaultInput, (isFocused || showSuccess) && 'border-secondary', className)}
      tabIndex={0}
    >
      {props.leftSlot && <>{props.leftSlot}</>}
      <input
        placeholder={props.placeholder}
        className={clsx('w-full', S.defaultPlaceHolder)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...rest}
      />
      {props.rightSlot && <>{props.rightSlot}</>}
    </div>
  );
}
