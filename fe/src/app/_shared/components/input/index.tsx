import { ForwardedRef, forwardRef, useImperativeHandle, useState } from 'react';

import styles from './index.module.scss';

type InputProps = {
  placeholder: string;
  name?: string;
  icon?: string;
  initialState?: string;
  type?: string;
  required?: boolean;
  autofocus?: boolean;
};

export type InputHandle = {
  getValue: () => string;
  clearValue: () => boolean;
};

function Input(
  {
    placeholder,
    name,
    initialState = '',
    type = 'text',
    required = true,
    autofocus = false,
  }: InputProps,
  ref: ForwardedRef<InputHandle>,
) {
  const [data, setData] = useState(initialState);

  useImperativeHandle(ref, () => ({
    getValue(): string {
      return data;
    },
    clearValue(): boolean {
      setData('')
      return true;
    },
  }));

  return (
    <input
      className={styles.field}
      value={data}
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      autoFocus={autofocus}
      onChange={(e) => setData(e.target.value)}
    />
  );
}

const InputWithRef = forwardRef<InputHandle, InputProps>(Input);

export default InputWithRef;
