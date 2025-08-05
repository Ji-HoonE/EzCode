import { defaultTextArea } from './unifiedInput.default.style';
import { PLACEHOLDER } from '@/constants/placeholder';
import { TZodKey } from '@/lib/zod/types';
import { twMerge } from 'tailwind-merge';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: TZodKey;
}

export default function TextAreaTypeFiled({ ...props }: Props) {
  const { name, value, onChange, className, ...rest } = props;
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={PLACEHOLDER[name]}
      className={twMerge(defaultTextArea, className)}
      {...rest}
    />
  );
}
