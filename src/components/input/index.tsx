import React from 'react';

import { Container } from './styles';

interface IInputProps {
  label: string;
  type: string | undefined;
  name: string | undefined;
  value: string;
  placeholder: string;
  onChangeValue: React.ChangeEventHandler<HTMLInputElement>;
  onInputBlur: React.FocusEventHandler<HTMLInputElement>;
  error: string | undefined;
}
const Input: React.FC<IInputProps> = ({
  label,
  type = 'text',
  value,
  onChangeValue,
  placeholder,
  name,
  onInputBlur,
  error,
}) => {
  return (
    <Container>
      <label htmlFor={label}>
        <span>{label}</span>
        <input
          type={type}
          id={label}
          name={name}
          onChange={onChangeValue}
          onBlur={onInputBlur}
          value={value}
          placeholder={placeholder}
        />
        <hr />
        <span className="input-error">{error}</span>
      </label>
    </Container>
  );
};

export default Input;
