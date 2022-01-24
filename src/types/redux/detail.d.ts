export interface IColorAndTamponade {
  colorId: string;
  tamponadeId: string;
}

export interface IDetails {
  colorAndTamponade: IColorAndTamponades;
}

export interface IStoreColorAndTamponade {
  type: 'ADD_COLOR_AND_TAMPONADE';
  payload: IColorAndTamponades;
}

type detailReduxAction = IStoreColorAndTamponade;
