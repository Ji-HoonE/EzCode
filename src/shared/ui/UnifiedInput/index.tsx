'use client';
import { PLACEHOLDER } from '@/constants/placeholder';
import { clsx } from 'clsx';
import { InputHTMLAttributes, ReactNode } from 'react';
import * as S from './unifiedInput.default.style';
import InputTypeFiled from './InputTypeFiled';
import TextAreaTypeFiled from './TextAreaTypeFiled';
import ImageTypeFiled from './ImageTypeFiled';
import { TZodKey } from '@/lib/zod/types';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { TAuthSchemaRegister } from '@/entities/auth/model/authZodSchemas';

/**
 * @description name - placeholder,validate 파일에 의해 name에 따라 선택됩니다.
 */

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, 'name'> {
  inputType: 'textarea' | 'image' | 'input';
  name: TZodKey;
  label?: string;
  labelStyle?: string;
  errorMessage?: string;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  register?: UseFormRegister<TAuthSchemaRegister>;
  setValue?: UseFormSetValue<TAuthSchemaRegister>;
  imageProps?: {
    previewImage: string;
    selectImage: (value: string) => void;
  };
}

export default function UnifiedInput({
  label,
  inputType,
  errorMessage,
  imageProps,
  name,
  setValue,
  register,
  ...props
}: Props) {
  const renderInputFiled = () => {
    switch (inputType) {
      case 'input':
        return (
          // <InputTypeFiled
          //   name={name}
          //   setValue={setValue}
          //   isError={!!errorMessage}
          //   register={register}
          //   {...props}
          // />
          <input />
        );
      case 'textarea':
        return <TextAreaTypeFiled name={name} {...props} />;

      case 'image':
        return <ImageTypeFiled imageProps={imageProps} className={props.className} />;

      default:
        return null;
    }
  };

  return (
    <div className={clsx('flex h-full w-full flex-col items-start gap-2')}>
      {label && <label className={clsx(S.defaultLabel, props.labelStyle)}>{label}</label>}
      <div className="flex h-full w-full flex-col gap-2">
        {renderInputFiled()}
        {errorMessage && <p className={S.defaultErrorMessage}>{errorMessage}</p>}
      </div>
    </div>
  );
}
