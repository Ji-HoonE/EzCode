'use client';
import { useState, useCallback } from 'react';
import { FieldErrors } from 'react-hook-form';

interface IUseInputTypeFiledStatus {
  errors: FieldErrors;
  name: string;
}

export function useInputTypeFiledStatus({ errors, name }: IUseInputTypeFiledStatus) {
  const [isFocused, setIsFocused] = useState(false);
  const [isBlur, setIsBlur] = useState(false);

  const isFailure = !!(errors[name]?.message as string | undefined);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    setIsBlur(false);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    setIsBlur(true);
  }, []);

  const showSuccess = isBlur && !isFailure === true;
  const showError = isFailure === true;

  return {
    isFocused,
    isBlur,
    showSuccess,
    showError,
    handleFocus,
    handleBlur,
  };
}
