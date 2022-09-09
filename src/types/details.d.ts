import { IOption } from './select';

export interface IColorResponse {
  id: number;
  color_name: string;
  color_porcentage: number;
  price_index: 1 | 2 | 3;
}
export interface ITamponadeResponse {
  id: number;
  tamponade_name: string;
  tamponade_porcentage: number;
  price_index: 1 | 2 | 3;
}

export interface IColorsAndTamponadesResponse {
  colors: IColorResponse[];
  tamponades: ITamponadeResponse[];
}

export interface IColorsAndTamponades {
  colors: IOption[];
  tamponades: IOption[];
}
