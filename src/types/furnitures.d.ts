export interface IFurniture {
  id: number;
  furnitureName: string;
  status: 1 | 0;
  roomId: number;
}

export interface IRequestUpdateFurnitureStatus {
  furnitureId: number;
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
