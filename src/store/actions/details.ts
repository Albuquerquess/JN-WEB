import { IColorAndTamponade } from '../../types/redux/detail';
import detailTypes from '../types/details';

export const addColorAndTamponade = (
  colorAndTamponade: IColorAndTamponade,
) => ({
  type: detailTypes.addColorAndTamponade,
  payload: colorAndTamponade,
});
