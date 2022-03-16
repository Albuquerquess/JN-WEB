export interface IFurniture {
  id: number;
  furniture_name: string;
  status: 1 | 0;
  room_id: number;
}

export interface IRequestUpdateFurnitureStatus {
  id: number;
  status: 'enable' | 'disable';
}

export interface IRequestUpdateFurniture {
  id: number;
  roomId: number;
  name: string;
}

export interface IRequestCreateFurniture {
  roomId: number;
  name: string;
}

export interface IParamsFurniturePage {
  roomId: number;
  furnitureId: number;
}

export interface IRequestDeleteFurniture {
  id: number;
  roomId: number;
}
