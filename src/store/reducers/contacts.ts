import { ContactReduxAction } from '../../types/redux/contacts';
import { IAppStateContacts } from '../types';

const init: IAppStateContacts = {
  name: '',
  email: '',
  phone: '',
};

export default function contacts(
  // eslint-disable-next-line default-param-last
  state: IAppStateContacts = init,
  action: any,
): object {
  switch (action.type) {
    case 'STORE_CONTACT':
      return {
        name: action.payload.name,
        email: action.payload.email,
        phone: action.payload.phone,
      };

    default:
      return state;
  }
}
