export interface IContact {
  name: string;
  email: string;
  phone: string;
}

export interface IStoreContact {
  type: 'STORE_CONTACT';
  payload: IContact;
}

type ContactReduxAction = IStoreContact;
