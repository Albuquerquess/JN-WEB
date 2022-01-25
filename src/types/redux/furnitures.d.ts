export interface IFurniture {
  furnitureId: string;
  variationId: string;
  roomId: string;
  length: number;
}

export interface IRoom {
  id: string;
  name: string;
}

export interface IRemoveFurniture {
  furnitureId: string;
}

export interface IStoreFurniture {
  type: 'ADD_FURNITURE';
  payload: IFurnitures;
}

export interface IAddRoom {
  type: 'ADD_ROOM';
  payload: IRoom;
}
