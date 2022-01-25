/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import ReactSelect from 'react-select';

import { ISelectProps } from '../../types/select';
import { Container } from './styles';

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
      background: '#909090',
      color: 'white',
      borderRadius: '.5em',
      boxShadow: null,
      borderColor: false,
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
        value={defaultValue}
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
