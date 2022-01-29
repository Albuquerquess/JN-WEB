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
  disable,
}) => {
  const customStyles = {
    control: (base: any) => ({
      ...base,
      background: disable ? '#dbdbdb' : '#909090',
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
      background: disable ? '#909090' : '#909090',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '14px',
    }),
    menuList: (base: any) => ({
      ...base,
      background: disable ? '#909090' : '#909090',
      color: 'white',
      padding: 0,
      fontWeight: 'bold',
      fontSize: '14px',
    }),
    placeholder: (base: any) => ({
      ...base,
      background: disable ? '#909090' : '#909090',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '14px',
    }),
    input: (base: any) => ({
      ...base,
      background: disable ? '#909090' : '#909090',
      color: 'white',
    }),
  };

  const sortedOptions = options.sort((a, b) =>
    // eslint-disable-next-line no-nested-ternary
    a.priceIndex > b.priceIndex ? 1 : b.priceIndex > a.priceIndex ? -1 : 0,
  );

  return (
    <Container>
      <ReactSelect
        menuPlacement={menuDirection || 'bottom'}
        styles={customStyles}
        className="react-select-container"
        classNamePrefix="react-select"
        placeholder={placeholder}
        options={sortedOptions}
        value={defaultValue}
        isMulti={false}
        components={{
          IndicatorSeparator: () => null,
        }}
        isSearchable={false}
        isDisabled={disable || false}
        onChange={target => target && setValue(target.value)}
      />
    </Container>
  );
};

export default Select;
