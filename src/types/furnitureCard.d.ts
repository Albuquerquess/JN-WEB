export interface IVariation {
  id: string;
  variation_name: string;
  variation_description: string;
  variation_price_index: number;
  variation_image: string;
  furniture_id: string;
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

export interface IFurnitureCartProps {
  furniture: IFurniture;
  variations: IVariation[];
  room: IRoom;
}
