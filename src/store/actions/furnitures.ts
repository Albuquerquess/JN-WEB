import {
  IFurniture,
  IRemoveFurniture,
  IRoom,
} from '../../types/redux/furnitures';
import furnituresTypes from '../types/furnitures';

export const addFurniture = (furniture: IFurniture) => ({
  type: furnituresTypes.addFurniture,
  payload: furniture,
});

export const removeFurniture = (removeFurniture: IRemoveFurniture) => ({
  type: furnituresTypes.removeFurniture,
  payload: removeFurniture,
});

export const addRoom = (room: IRoom) => ({
  type: furnituresTypes.addRoom,
  payload: room,
});
