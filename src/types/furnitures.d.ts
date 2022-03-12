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
