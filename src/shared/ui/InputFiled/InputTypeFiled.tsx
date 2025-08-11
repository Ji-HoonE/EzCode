import clsx from 'clsx';
import { ReactNode } from 'react';
import * as S from './unifiedInput.default.style';
import { useFormContext } from 'react-hook-form';
import { TZodKey } from '@/lib/zod/types';
import { SCHEMA_PLACEHOLDER } from '@/constants/placeholder';
import { useInputTypeFiledStatus } from '@/shared/hooks/UnifiedInput/useInputTypeFiledStatus';

interface IInputTypeFiledProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'> {
  name: TZodKey | string;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
}

export default function InputTypeFiled({ leftSlot, rightSlot, ...props }: IInputTypeFiledProps) {
  const { name, className, ...rest } = props;
  const { isFocused, showSuccess, handleFocus, handleBlur } = useInputTypeFiledStatus({});
  // const { onChange, onBlur, ref } = register?.(name as TZodKey);

  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors[name]?.message as string | undefined;

  return (
    <div>
      <div
        className={clsx(
          S.defaultInput,
          (isFocused || showSuccess) && 'border-secondary',
          // isError && 'border-dangerous',
          className
        )}
        tabIndex={0}
      >
        {leftSlot && <>{leftSlot}</>}
        <input
          // ref={ref}
          id={name}
          placeholder={SCHEMA_PLACEHOLDER[name]}
          {...register(name)}
          className={clsx(S.defaultPlaceHolder, error ? 'border-red-500' : 'border-gray-300')}
          // onFocus={handleFocus}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            // onBlur(e);
            handleBlur(e);
          }}
          {...rest}
        />
        {rightSlot && <>{rightSlot}</>}
      </div>
      {errors && <p className={S.defaultErrorMessage}>{error}</p>}
    </div>
  );
}
