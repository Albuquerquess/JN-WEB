import { IContact } from '../../types/redux/contacts';
import contactTypes from '../reduxTypes/contacts';

export const addContact = (contact: IContact) => ({
  type: contactTypes.storeContact,
  payload: contact,
});
