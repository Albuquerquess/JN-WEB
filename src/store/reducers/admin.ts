import usersTypes from '../reduxTypes/users';
import { IAppStateAdmin } from '../types';

const init: IAppStateAdmin = {
  authData: {
    username: '',
    password: '',
  },
  user: {
    name: '',
    siteOwner: '',
  },
  token: '',
};

export default function admin(
  // eslint-disable-next-line default-param-last
  state: IAppStateAdmin = init,
  action: any,
): IAppStateAdmin {
  switch (action.type) {
    case usersTypes.tryLogin:
      return {
        ...state,
        authData: {
          username: action.payload.username,
          password: action.payload.password,
        },
      };

    case usersTypes.login:
      return {
        ...state,
        user: {
          name: action.payload.name,
          siteOwner: action.payload.siteOwner,
        },
        token: action.payload.token,
      };

    case usersTypes.logout:
      return {
        ...state,
        token: '',
      };

    default:
      return state;
  }
}
