import React from 'react';
import ReactSelect from 'react-select';

import { Container } from './styles';

type option = {
  value: string;
  label: JSX.Element;
};

interface ISelectProps {
  options: option[];
  defaultValue: option;
  placeholder: string | undefined;
  setValue(value: string): void;
  menuDirection: 'bottom' | 'top' | 'auto';
}

const Select: React.FC<ISelectProps> = ({
  options,
  defaultValue,
  placeholder,
  setValue,
  menuDirection,
}) => {
  const customStyles = {
    control: (base: any) => ({
      ...base,
      background: false ? 'rgba(144, 144, 144, 0.4)' : '#909090',
      color: 'white',
      borderRadius: '.5em',
      boxShadow: null,
      borderColor: false ? 'rgba(144, 144, 144, 0.4)' : '#909090',
      fontWeight: 'bold',
      fontSize: '14px',
    }),
    menu: (base: any) => ({
      ...base,
      borderRadius: 0,
      marginTop: 0,
      background: '#909090',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '14px',
    }),
    menuList: (base: any) => ({
      ...base,
      background: '#909090',
      color: 'white',
      padding: 0,
      fontWeight: 'bold',
      fontSize: '14px',
    }),
    placeholder: (base: any) => ({
      ...base,
      background: '#909090',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '14px',
    }),
    input: (base: any) => ({
      ...base,
      background: '#909090',
      color: 'white',
    }),
  };

  return (
    <Container>
      <ReactSelect
        menuPlacement={menuDirection || 'bottom'}
        styles={customStyles}
        className="react-select-container"
        classNamePrefix="react-select"
        placeholder={placeholder}
        options={options}
        defaultValue={defaultValue}
        isMulti={false}
        components={{
          IndicatorSeparator: () => null,
        }}
        onChange={target => target && setValue(target.value)}
      />
    </Container>
  );
};

export default Select;
