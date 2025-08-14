'use client';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  imageProps?: {
    previewImage: string;
    selectImage: (value: string) => void;
  };
  className?: string;
}

export default function ImageTypeFiled({ className, imageProps }: Props) {
  const _ = { className, imageProps }; // 미사용 변수 경고 방지
  return <div></div>;
}
