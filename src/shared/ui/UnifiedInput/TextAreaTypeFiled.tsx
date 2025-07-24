import clsx from 'clsx';
import { defaultTextArea } from './unifiedInput.default.style';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export default function TextAreaTypeFiled({ onChange, className, ...props }: Props) {
  return (
    <textarea
      name={props.name}
      value={props.value}
      onChange={onChange}
      placeholder={props.placeholder}
      {...props}
      className={clsx(defaultTextArea, 'min-h-[153px] rounded-[5px]', className)}
    />
  );
}
