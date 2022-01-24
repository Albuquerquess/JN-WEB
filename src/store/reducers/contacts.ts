import { ContactReduxAction } from '../../types/redux/contacts';
import { CONTACT_INITIAL_STATE } from '../initialState';

export default function contacts(
  // eslint-disable-next-line default-param-last
  state = CONTACT_INITIAL_STATE,
  action: ContactReduxAction,
): object {
  if (!action || !action.type) return {};
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
