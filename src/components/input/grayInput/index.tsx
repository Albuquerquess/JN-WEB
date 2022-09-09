import React from 'react';
import InputMask from 'react-input-mask';

import { Container } from './styles';

interface IGrayInputProps {
  id: string;
  mask: string;
  value: string;
  type: string | undefined;
  placeholder: string;
  onChangeValue: React.Dispatch<React.SetStateAction<any>> | undefined;
  onInputBlur: React.Dispatch<React.SetStateAction<any>> | undefined;
}

const GrayInput: React.FC<IGrayInputProps> = ({
  id,
  mask,
  value,
  type,
  placeholder,
  onChangeValue,
  onInputBlur,
}) => {
  function handleChangeValue(e: React.ChangeEvent<HTMLInputElement>) {
    if (onChangeValue) {
      onChangeValue(e.target.value);
    }
  }

  function handleBlurValue(e: React.FocusEvent<HTMLInputElement>) {
    if (onInputBlur) {
      onInputBlur(e.target.value);
    }
  }

  return (
    <Container className="gray-input">
      <InputMask
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleChangeValue(e);
        }}
        onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
          handleBlurValue(e);
        }}
        mask={mask}
        type={type}
        placeholder={placeholder}
        className="gray-input"
        color="red"
        id={id}
        maskChar={null}
      />
    </Container>
  );
};

export default GrayInput;
