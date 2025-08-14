'use client';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  imageProps?: {
    previewImage: string;
    selectImage: (value: string) => void;
  };
  className?: string;
}

export default function ImageTypeFiled({ className, imageProps }: Props) {
  console.log(className, imageProps);
  return <div></div>;
}
