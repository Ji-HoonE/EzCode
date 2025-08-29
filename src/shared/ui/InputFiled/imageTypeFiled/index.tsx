'use client';

import { useRef, useState } from 'react';
import RenderImageContent from './RenderImageContent';
import WrapperImageInput from './WrapperImageInput';

export type TImageVariant = 'profile-circle' | 'square' | 'custom';
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  imageProps?: {
    previewImage: string | null;
    selectImage: (value: string) => void;
    variant: TImageVariant;
    description?: string;
  };
  className?: string;
}

export default function ImageTypeFiled({ name, imageProps, className }: Props) {
  const [previewImage, setPreviewImage] = useState<string | null>(imageProps?.previewImage || null);
  const [isFocused, setIsFocused] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  if (!imageProps) return null;
  const { selectImage, variant, description } = imageProps;

  const onBlur = () => {
    fileInputRef.current?.blur();
    setIsFocused(false);
  };

  const onFocus = () => {
    fileInputRef.current?.focus();
    setIsFocused(true);
  };
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    const fileURL = URL.createObjectURL(file);
    selectImage(fileURL);
    setPreviewImage(fileURL);
  };

  return (
    <WrapperImageInput variant={variant} className={className} isFocused={isFocused}>
      <input
        ref={fileInputRef}
        id={name}
        name={name}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="sr-only"
        tabIndex={0}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {/* Selected */}
      <label htmlFor={name} className="cursor-pointer">
        <RenderImageContent
          variant={variant}
          previewImage={previewImage}
          description={description}
        />
      </label>
    </WrapperImageInput>
  );
}
