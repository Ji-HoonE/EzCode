import { defaultTextArea } from './unifiedInput.default.style';
import { NO_SCHEMA_PLACEHOLDER } from '@/constants/placeholder';
import { twMerge } from 'tailwind-merge';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
}

export default function TextAreaTypeFiled({ ...props }: Props) {
  const { name, value, onChange, className, ...rest } = props;
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={NO_SCHEMA_PLACEHOLDER[name]}
      className={twMerge(defaultTextArea, className)}
      {...rest}
    />
  );
}
