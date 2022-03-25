export interface IVariation {
  id: string;
  name: string;
  description: string;
  priceIndex: number;
  imageSrc: string;
  furnitureId: string;
  created_at: string;
}

export interface IFurniture {
  id: string;
  furnitureName: string;
}

export interface IRoom {
  id: string;
  name: string;
}

export interface IFurnitureCardProps {
  furniture: IFurniture;
  variations: IVariation[];
  room: IRoom;
}
