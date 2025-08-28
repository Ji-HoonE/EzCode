import { cn } from '@/lib/utils';
import { TImageVariant } from '.';

interface Props {
  variant: TImageVariant;
  children: React.ReactNode;
  className?: string;
}
export default function WrapperImageInput({ variant, children, className }: Props) {
  if (variant === 'profile-circle') {
    return (
      <div
        className={cn(
          'relative rounded-full w-[150px] h-[150px] overflow-hidden flex items-center justify-center',
          className
        )}
      >
        {children}
      </div>
    );
  }
  if (variant === 'square') {
    return (
      <div
        className={cn(
          'relative border-2 border-[#2a3441] min-h-50 h-full max-h-50 rounded-[10px] text-center hover:border-secondary transition-colors',
          className
        )}
      >
        {children}
      </div>
    );
  }
  if (variant === 'custom') {
    return <div className={cn('relative', className)}>{children}</div>;
  }
  return null;
}
