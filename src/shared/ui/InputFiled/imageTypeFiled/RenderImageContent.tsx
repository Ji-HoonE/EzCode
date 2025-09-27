'use client';

import Image from 'next/image';
import { TImageVariant } from '.';
import { cn } from '@/lib/utils';

interface RenderImageContentProps {
  previewImage: string | null;
  variant: TImageVariant;
  description?: string;
}

export default function RenderImageContent({
  previewImage,
  variant,
  description,
}: RenderImageContentProps) {
  return (
    <>
      {variant === 'profile-circle' ? (
        <Image
          src={previewImage || '/icons/mypage/defaultImg.svg'}
          fill
          className={cn('object-cover absolute')}
          alt="preview-image"
          unoptimized
        />
      ) : previewImage ? (
        <Image
          src={previewImage}
          fill
          className={cn('object-contain absolute')}
          alt="preview-image"
          unoptimized
        />
      ) : (
        <div className="absolute flex flex-col gap-2 items-center justify-center w-full h-full">
          <Image
            src="/icons/upload.svg"
            width={40}
            height={40}
            className={cn('object-none')}
            alt="preview-image"
          />
          {description && <p className="text-[#ccc]">{description}</p>}
        </div>
      )}
    </>
  );
}
