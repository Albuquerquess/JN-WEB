import furnituresTypes from '../reduxTypes/furnitures';
import { IAppStateFurniture } from '../types';

const init: IAppStateFurniture = {
  selected: [],
  room: {
    id: '',
    name: '',
  },
};

export default function furnitures(
  // eslint-disable-next-line default-param-last
  state: IAppStateFurniture = init,
  action: any,
): IAppStateFurniture {
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
        room: {
          ...state.room,
        },
      };

    case furnituresTypes.removeFurniture:
      return {
        selected: state.selected.filter(
          furniture => furniture.furnitureId !== action.payload.furnitureId,
        ),
        room: {
          ...state.room,
        },
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
