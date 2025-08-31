import { cn } from '@/lib/utils';
import { TImageVariant } from '.';
import Image from 'next/image';

interface Props {
  variant: TImageVariant;
  children: React.ReactNode;
  isFocused: boolean;
  removeImage: () => void;
  className?: string;
}
export default function WrapperImageInput({ ...props }: Props) {
  const { variant, children, isFocused, className, removeImage } = props;

  const removeButton = (variant: TImageVariant) => {
    return (
      <button
        onClick={removeImage}
        className={cn(
          'absolute  z-10',
          variant === 'profile-circle' ? 'top-5 right-5 bg-primary rounded-md' : ' top-2 right-2'
        )}
      >
        <Image src="/icons/close/closeWithBorder.svg" alt="closeButton" width={20} height={20} />
      </button>
    );
  };

  if (variant === 'profile-circle') {
    return (
      <div
        className={cn(
          'relative rounded-full w-37 h-37 overflow-hidden flex items-center justify-center',
          className
        )}
      >
        {removeButton(variant)}
        {children}
      </div>
    );
  }
  if (variant === 'square') {
    return (
      <div
        className={cn(
          'relative border-2 min-h-50 h-full max-h-50 rounded-[10px] text-center transition-colors',
          isFocused ? 'border-secondary' : 'border-gray-700',
          className
        )}
      >
        {removeButton(variant)}
        {children}
      </div>
    );
  }
  if (variant === 'custom') {
    return (
      <div className={cn('relative', className)}>
        {removeButton(variant)}
        {children}
      </div>
    );
  }
  return null;
}
