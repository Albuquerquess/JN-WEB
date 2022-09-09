import styled from 'styled-components';

export const Container = styled.div`
  div.react-select-container
    > div.react-select__control
    > div.react-select__value-container
    > div.react-select__single-value {
    width: auto;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;

    & > img.price-index-icon-img {
      width: auto;
      height: 35px;
    }
  }

  div.react-select-container
    > div.react-select__menu
    > div.react-select__menu-list
    > div.react-select__option {
    display: flex;
    align-items: center;
    justify-content: center;

    img.price-index-icon-img {
      height: auto;
      width: 60px;
    }
  }
  div.variation-price-index {
  }
`;
