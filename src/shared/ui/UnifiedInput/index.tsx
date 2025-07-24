import { PLACEHOLDER } from '@/constants/placeholder';
import { clsx } from 'clsx';
import { InputHTMLAttributes, ReactNode } from 'react';
import * as S from './unifiedInput.default.style';
import InputTypeFiled from './InputTypeFiled';
import TextAreaTypeFiled from './TextAreaTypeFiled';
import ImageTypeFiled from './ImageTypeFiled';

/**
 * @description name - placeholder,validate 파일에 의해 name에 따라 선택됩니다.
 */

interface Props extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  inputType: 'textarea' | 'image' | 'input';
  name: string;

  label?: string;
  labelStyle?: string;

  leftSlot?: ReactNode;
  rightSlot?: ReactNode;

  imageProps?: {
    previewImage: string;
    selectImage: (value: string) => void;
  };
}

export default function UnifiedInput({ label, inputType, imageProps, name, ...props }: Props) {
  const renderInputFiled = () => {
    switch (inputType) {
      case 'input':
        return <InputTypeFiled placeholder={PLACEHOLDER[name]} {...props} />;

      case 'textarea':
        return <TextAreaTypeFiled placeholder={PLACEHOLDER[name]} {...props} />;

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
        {<p className={S.defaultErrorMessage}>{'에러메시지'}</p>}
      </div>
    </div>
  );
}
