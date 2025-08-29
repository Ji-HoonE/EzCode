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

  const { isFocused, isBlur, showSuccess, showError, handleFocus, handleBlur } =
    useInputTypeFiledStatus({
      errors,
      name,
    });
  const error = errors[name]?.message ? String(errors[name]?.message) : undefined;

  return (
    <div className="flex flex-col gap-1">
      <div
        className={cn(
          S.defaultInputArea,
          (isFocused || showSuccess) && 'border-secondary',
          isBlur && 'border-gray700',
          showError && 'border-danger',
          className
        )}
      >
        {leftSlot && <>{leftSlot}</>}
        <input
          id={name}
          type={name === 'password' ? 'password' : 'text'}
          placeholder={SCHEMA_PLACEHOLDER[name]}
          {...register(name)}
          className={S.defaultInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />
        {rightSlot && <>{rightSlot}</>}
      </div>
      {error && <p className={S.defaultErrorMessage}>{error}</p>}
    </div>
  );
}
