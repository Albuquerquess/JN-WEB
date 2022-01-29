import { IColorAndTamponade } from '../../types/redux/detail';
import detailTypes from '../reduxTypes/details';

export const addColorAndTamponade = (
  colorAndTamponade: IColorAndTamponade,
) => ({
  type: detailTypes.addColorAndTamponade,
  payload: colorAndTamponade,
});
