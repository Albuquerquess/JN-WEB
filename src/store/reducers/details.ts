import { detailReduxAction } from '../../types/redux/detail';
import { IAppStateDetails } from '../types';

const init: IAppStateDetails = {
  colorAndTamponade: {
    colorId: '',
    tamponadeId: '',
  },
};

export default function details(
  // eslint-disable-next-line default-param-last
  state: IAppStateDetails = init,
  action: detailReduxAction,
): object {
  switch (action.type) {
    case 'ADD_COLOR_AND_TAMPONADE':
      return {
        colorAndTamponade: {
          colorId: action.payload.colorId,
          tamponadeId: action.payload.tamponadeId,
        },
      };

    default:
      return state;
  }
}
