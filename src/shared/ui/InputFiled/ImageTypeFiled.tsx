'use client';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  imageProps?: {
    previewImage: string;
    selectImage: (value: string) => void;
  };
  className?: string;
}

export default function ImageTypeFiled({ className, imageProps }: Props) {
  console.log(className, imageProps); // 빌드에러를 피하기 위한 console.log() 작성
  return <div></div>;
}
