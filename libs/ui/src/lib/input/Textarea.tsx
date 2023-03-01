import { Textarea, TextareaProps } from '@mantine/core';

export type TextareaInputProps = TextareaProps & {
  width?: number | string;
};

export function TextareaInput({ value, placeholder, minRows, maxRows, label, width, ...rest }: TextareaInputProps) {
  return (
    <Textarea
      value={value}
      label={label}
      placeholder={placeholder}
      autosize
      minRows={minRows}
      maxRows={maxRows}
      {...rest}
    />
  );
}
export default TextareaInput;
