import { FURNITURE_INITIAL_STATE } from '../initialState';
import furnituresTypes from '../types/furnitures';

export default function furnitures(
  // eslint-disable-next-line default-param-last
  state = FURNITURE_INITIAL_STATE,
  action: any,
): object {
  if (!action || !action.type) return {};

  console.log(`
  [reducer]furnitures - 
  state: ${JSON.stringify(state)}
  action: ${JSON.stringify(action)}`);

  switch (action.type) {
    case furnituresTypes.addFurniture:
      return {
        selected: [
          ...state.selected,
          {
            furnitureId: action.payload.furnitureId,
            variationId: action.payload.variationId,
            roomId: action.payload.roomId,
            length: action.payload.length,
          },
        ],
      };

    case furnituresTypes.removeFurniture:
      return {
        selected: state.selected.filter(
          furniture => furniture.furnitureId !== action.payload.furnitureId,
        ),
      };

    case furnituresTypes.addRoom:
      return {
        ...state,
        room: {
          id: action.payload.id,
          name: action.payload.name,
        },
      };

    default:
      return state;
  }
}
