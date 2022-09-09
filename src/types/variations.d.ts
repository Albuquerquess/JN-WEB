export interface IVariation {
  id: number;
  title: string;
  value: number;
  status: 1 | 0;
  priceIndex: number;
  imageSrc: string;
  description: string;
  furnitureId: number;
  roomId: number;
  percentageByColor?: number;
  percentageByLaca?: number;
  percentageByTamponade?: number;
}

export interface IRequestFindVariationsByFurnitureId {
  furnitureId: number;
  roomId: number;
}

export interface IUpdateVariation {
  id;
  title;
  value;
  description;
  priceIndex: number;
}

export interface IRequestUpdateVariationStatus {
  id: number;
  status: boolean;
}

export interface IRequestCreateVariation {
  title: string;
  value: number;
  description: string;
  priceIndex: number;
  furnitureId: number;
  roomId: number;
  file: File;
}
