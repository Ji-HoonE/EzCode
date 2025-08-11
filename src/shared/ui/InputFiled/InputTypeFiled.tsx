import { ReactNode } from 'react';
import * as S from './unifiedInput.default.style';
import { useFormContext } from 'react-hook-form';
import { TZodKey } from '@/shared/lib/zod/types';
import { SCHEMA_PLACEHOLDER } from '@/constants/placeholder';
import { useInputTypeFiledStatus } from '@/shared/hooks/UnifiedInput/useInputTypeFiledStatus';
import { cn } from '@/lib/utils';

interface IInputTypeFiledProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'> {
  name: TZodKey | string;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
}

export default function InputTypeFiled({ leftSlot, rightSlot, ...props }: IInputTypeFiledProps) {
  const { name, className, ...rest } = props;
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const { isFocused, showSuccess, showError, handleFocus, handleBlur } = useInputTypeFiledStatus({
    ...register,
  });

  const error = errors[name]?.message as string | undefined;

  return (
    <div className="flex flex-col gap-1">
      <div
        className={cn(
          S.defaultInputArea,
          (isFocused || showSuccess) && 'border-secondary',
          showError && 'border-dangerous',
          className
        )}
        tabIndex={0}
      >
        {leftSlot && <>{leftSlot}</>}
        <input
          id={name}
          placeholder={SCHEMA_PLACEHOLDER[name]}
          {...register(name)}
          className={cn(S.defaultInput, error ? 'border-red-500' : 'border-gray-300')}
          onFocus={handleFocus}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
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
