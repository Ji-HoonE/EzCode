'use client';
import clsx from 'clsx';
import { useState } from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  imageProps?: {
    previewImage: string;
    selectImage: (value: string) => void;
  };
  className?: string;
}

export default function ImageTypeFiled({ className, imageProps, ...props }: Props) {
  const [currentImage, setCurrentImage] = useState<string | null>(imageProps?.previewImage || null);
  const inputId = 'file-upload';

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      // const formattedImage = await getBase64(file);
      // const imageUrl = await createImageURL(e.target.value);
      // setCurrentImage(formattedImage);
      // selectImage?.(imageUrl);
    } catch (error) {
      console.error('이미지 변환 실패:', error);
      setCurrentImage(null);
      //@todo : 에러 핸들링
    }
  };

  return (
    <div
      className={clsx(
        'border-gray30 bg-gray10 flex h-[276px] w-[483px] items-center justify-center rounded-[5px] border-1',
        className
      )}
    >
      {/* <input
        id={inputId}
        type="file"
        onChange={handleImageUpload}
        value={props.value}
        {...props}
        className="hidden"
      />
      {currentImage ? (
        <div className="relative h-full w-full">
          <img src={currentImage} alt="previewImage" className="h-full w-full bg-black/70" />
          <label
            htmlFor={inputId}
            className="absolute top-[calc(50%-15px)] left-[calc(50%-54px)] flex h-15 w-27 flex-col items-center justify-center gap-[11px]"
          >
            {/* <ImageUploaderIcon className="text-white" /> */}
      {/* <p className="text-lg-bold text-white">이미지 변경하기</p>
          </label>
        </div>
      ) : ( */}
      {/* <label htmlFor={inputId} className="flex flex-col items-center justify-center gap-[11px]"> */}
      {/* <ImageUploaderIcon className="text-gray40" /> */}
      {/* <p className="text-lg-bold text-gray40">이미지 추가하기</p>
        </label>
      )} */}
    </div>
  );
}
