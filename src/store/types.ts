export enum Constants {
  /* furnitures */
  ADD_FURNITURE = 'ADD_FURNITURE',
}

/* typing... */
// Furnitures
type IFurnituresSelecteds = {
  variationId: string;
  furnitureId: string;
  roomId: string;
  length: number;
};

type ICurrentRoom = {
  id: string;
  name: string;
};

// details
type IColorAndTamponade = {
  colorId: string;
  tamponadeId: string;
};

/* Furnitures */
export interface IAppStateFurniture {
  selected: IFurnituresSelecteds[];
  room: ICurrentRoom;
}

/* Details */
export interface IAppStateDetails {
  colorAndTamponade: IColorAndTamponade;
}

/* Contacts */
export interface IAppStateContacts {
  name: string;
  email: string;
  phone: string;
}

/* State */
export interface IAppState {
  furnitures: IAppStateFurniture;
  details: IAppStateDetails;
  contacts: IAppStateContacts;
}
