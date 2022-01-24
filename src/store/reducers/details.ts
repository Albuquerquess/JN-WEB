import { detailReduxAction } from '../../types/redux/detail';
import { DETAIL_INITIAL_STATE } from '../initialState';

export default function details(
  // eslint-disable-next-line default-param-last
  state = DETAIL_INITIAL_STATE,
  action: detailReduxAction,
): object {
  if (!action || !action.type) return {};
  console.log('entrou');
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
