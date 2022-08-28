import React from 'react';

import { Container } from './styles';

interface IGrayTeaxtareaProps {
  id: string;
  value: string;
  placeholder: string;
  onChangeValue: React.Dispatch<React.SetStateAction<string>> | undefined;
  onInputBlur: React.Dispatch<React.SetStateAction<string>> | undefined;
  maxLength: number | undefined;
}

const GrayTextarea: React.FC<IGrayTeaxtareaProps> = ({
  id,
  value,
  placeholder,
  onChangeValue,
  onInputBlur,
  maxLength,
}) => {
  function handleChangeValue(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (onChangeValue) {
      onChangeValue(e.target.value);
    }
  }

  function handleBlurValue(e: React.FocusEvent<HTMLTextAreaElement>) {
    if (onInputBlur) {
      onInputBlur(e.target.value);
    }
  }
  return (
    <Container className="textarea-container">
      <textarea
        value={value}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          handleChangeValue(e);
        }}
        onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => {
          handleBlurValue(e);
        }}
        placeholder={placeholder}
        className="gray-input"
        maxLength={maxLength}
        id={id}
      />
    </Container>
  );
};

export default GrayTextarea;
