'use client';
import { useState, useCallback } from 'react';

interface IUseInputTypeFiledStatus {
  isSuccess?: boolean;
  isFailure?: boolean;
  // isSubmit?: boolean;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

export function useInputTypeFiledStatus({ ...props }: IUseInputTypeFiledStatus) {
  const [isFocused, setIsFocused] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const { isSuccess, isFailure, onFocus, onBlur } = props;

  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    },
    [onFocus]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setIsTouched(true);
      onBlur?.(e);
    },
    [onBlur]
  );

  const showSuccess = isTouched && isSuccess === true;
  const showError = isTouched && isFailure === true;

  return {
    isFocused,
    isTouched,
    showSuccess,
    showError,
    handleFocus,
    handleBlur,
  };
}
export interface IInputTypeFiledStatus {
  isFocused: boolean;
  isTouched: boolean;
  showSuccess: boolean;
  showError: boolean;
  handleFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}
