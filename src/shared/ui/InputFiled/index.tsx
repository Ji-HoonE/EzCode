'use client';
import { InputHTMLAttributes, ReactNode } from 'react';
import * as S from './unifiedInput.default.style';
import InputTypeFiled from './InputTypeFiled';
import TextAreaTypeFiled from './TextAreaTypeFiled';
import ImageTypeFiled from './ImageTypeFiled';
import { TZodKey } from '@/shared/lib/zod/types';
import { cn } from '@/lib/utils';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, 'name'> {
  inputType: 'textarea' | 'image' | 'input';
  name: TZodKey | string;
  label?: string;
  labelStyle?: string;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;

  imageProps?: {
    previewImage: string;
    selectImage: (value: string) => void;
  };
}

export default function UnifiedInput({ inputType, label, ...props }: Props) {
  const { name, imageProps, labelStyle, ...rest } = props;

  const renderInputFiled = () => {
    switch (inputType) {
      case 'input':
        return <InputTypeFiled name={name} {...rest} />;
      case 'textarea':
        return <TextAreaTypeFiled name={name} {...rest} />;
      case 'image':
        return <ImageTypeFiled imageProps={imageProps} className={rest.className} />;

      default:
        return null;
    }
  };

  return (
    <div className={cn('flex h-full w-full flex-col items-start gap-2')}>
      {label && (
        <label htmlFor={name} className={cn(S.defaultLabel, labelStyle)}>
          {label}
        </label>
      )}
      <div className="flex h-full w-full flex-col gap-2">{renderInputFiled()}</div>
    </div>
  );
}
