import styled from 'styled-components';

import { breakpoints } from '../../../styles/breakpoints';

interface IStyleCardProps {
  image: string | undefined;
  selected: boolean;
}

export const Container = styled.div<IStyleCardProps>`
  width: 100%;
  min-height: 44em;
  max-height: 100%;

  background: #efefef;

  border-radius: 1.5em;
  padding: 2em;

  section.furniture-card-header {
    height: 24.6em;
    background: #d5d5d5;
    border-radius: 1.5em;
    background-image: url(${props => props.image});

    background-repeat: no-repeat;
    background-position: center center;
    background-position-x: center;
    background-position-y: center;
    background-size: cover;

    margin-bottom: 2em;
  }

  section.furniture-card-body {
    margin-bottom: 1em;

    div.furniture-card-info-wrapper {
      margin-bottom: 2em;
      width: 100%;

      h3 {
        font-size: 1.4em;
        margin-bottom: 0.71em;
      }

      p {
        font-size: 1.2em;
      }
    }

    label.furniture-card-input-box > p,
    label.furniture-card-select-box > p {
      font-size: 1.4em;
      font-weight: bold;
      margin-bottom: 10px;
    }

    label.furniture-card-input-box {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-top: 2em;
      margin-bottom: 20px;

      & > span {
        font-size: 1.4em;
        font-weight: bold;
        margin-bottom: 10px;
      }
      & > input {
        width: 100%;
        height: 36px;
        background: ${props => props.theme.colors.cardInput};
        border: none;
        border-radius: 0.6em;
        font-size: 1.4em;

        padding-left: 10px;
      }
    }
  }

  button.furniture-card-button {
    width: 100%;
    height: 36px;
    border-radius: 5px;
    border: none;
    background: ${props =>
      props.selected
        ? props.theme.colors.buttonRed
        : props.theme.colors.buttonGreen};

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    & > svg {
      height: calc(100% - 11px);
      width: auto;
      margin-right: 20px;
      transform: rotate(${props => (props.selected ? '135deg' : '0deg')});
      transition: 0.4s ease;
    }

    p.furniture-card-button-label {
      font-size: 20px;
      font-weight: bold;
      color: #ffffff;
    }
  }

  label.furniture-card-select-box > p {
    font-weight: bold;
    font-size: 1.4em;
    margin-bottom: 10px;
  }

  @media screen and (min-width: ${breakpoints.md}) {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: space-between;
    min-height: 46.4em;

    padding: 4em;

    section.furniture-card-header {
      width: 100%;
      max-width: 328px;
      min-height: 46.4em;
    }

    section.furniture-card-body {
      height: 100%;
      min-height: 46.4em;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      width: 100%;
      padding-right: 3em;

      div.furniture-card-info-wrapper {
        h3 {
          font-size: 3.2em;
        }
        p {
          font-size: 2em;
          font-weight: 300;

          max-height: 115px;
          overflow: hidden;
          margin-bottom: 10px;
        }
      }

      div.furniture-card-tools-wrapper {
        width: 100%;
        label.furniture-card-input-box > p,
        label.furniture-card-select-box > p {
          font-size: 24px;
          font-weight: bold;
        }
        /* Select CSS */
        label.furniture-card-select-box {
          .react-select__control {
            height: 59px;
          }
        }
        /* End select CSS */
        label.furniture-card-input-box {
          & > input {
            height: 49px;
            font-size: 20px;
          }
        }
      }

      button.furniture-card-button {
        height: 58px;
        & > svg {
          height: 38px;
        }
      }
    }
  }
`;
