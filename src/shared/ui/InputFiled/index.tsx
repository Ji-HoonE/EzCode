'use client';
import { InputHTMLAttributes, ReactNode } from 'react';
import * as S from './unifiedInput.default.style';
import InputTypeFiled from './InputTypeFiled';
import TextAreaTypeFiled from './TextAreaTypeFiled';
import ImageTypeFiled from './ImageTypeFiled';
import { TZodKey } from '@/shared/lib/zod/types';
import { cn } from '@/lib/utils';

/**
 * @description name - placeholder,validate 파일에 의해 name에 따라 선택됩니다.
 */

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, 'name'> {
  inputType: 'textarea' | 'image' | 'input';
  name: TZodKey | string;
  label?: string;
  labelStyle?: string;
  errorMessage?: string;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;

  imageProps?: {
    previewImage: string;
    selectImage: (value: string) => void;
  };
}

export default function UnifiedInput({ inputType, label, errorMessage, ...props }: Props) {
  const { name, imageProps, ...rest } = props;

  const renderInputFiled = () => {
    switch (inputType) {
      case 'input':
        return <InputTypeFiled name={name} {...rest} />;
      case 'textarea':
        return <TextAreaTypeFiled name={name} {...rest} />;
      case 'image':
        return <ImageTypeFiled imageProps={imageProps} className={props.className} />;

      default:
        return null;
    }
  };

  return (
    <div className={cn('flex h-full w-full flex-col items-start gap-2')}>
      {label && <label className={cn(S.defaultLabel, props.labelStyle)}>{label}</label>}
      <div className="flex h-full w-full flex-col gap-2">{renderInputFiled()}</div>
    </div>
  );
}
