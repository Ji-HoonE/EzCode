import clsx from 'clsx';
import { ReactNode, useState } from 'react';
import * as S from './unifiedInput.default.style';
import { useInputTypeFiledStatus } from '@/shared/hooks/UnifiedInput/useInputTypeFiledStatus';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { TZodKey } from '@/lib/zod/types';
import { TAuthSchemaRegister } from '@/entities/auth/model/authZodSchemas';

interface IInputTypeFiledProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'> {
  name: TZodKey;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  isError: boolean;
  setValue: UseFormSetValue<TAuthSchemaRegister>;
  register: UseFormRegister<TAuthSchemaRegister>;
}

export default function InputTypeFiled({
  className,
  name,
  register,
  isError,
  setValue,
  ...props
}: IInputTypeFiledProps) {
  const { leftSlot, rightSlot, ...rest } = props;
  const { isFocused, showSuccess, handleFocus, handleBlur } = useInputTypeFiledStatus({});
  const { onChange, onBlur, ref } = register(name);

  return (
    <div
      className={clsx(
        S.defaultInput,
        (isFocused || showSuccess) && 'border-secondary',
        isError && 'border-dangerous',
        className
      )}
      tabIndex={0}
    >
      {leftSlot && <>{leftSlot}</>}
      <input
        ref={ref}
        placeholder={props.placeholder}
        className={clsx('w-full', S.defaultPlaceHolder)}
        onFocus={handleFocus}
        onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
          onBlur(e);
          handleBlur(e);
        }}
        onChange={(e) => {
          onChange(e);
          setValue(name, e.target.value, { shouldValidate: true });
        }}
        {...rest}
      />
      {rightSlot && <>{rightSlot}</>}
    </div>
  );
}
