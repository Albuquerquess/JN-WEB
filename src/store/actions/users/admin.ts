import { IAdminLogin, ITryAdminLogin } from '../../../types/redux/users/admin';
import usersTypes from '../../reduxTypes/users';

export const adminTryLogin = (tryLogin: ITryAdminLogin) => ({
  type: usersTypes.tryLogin,
  payload: tryLogin,
});

export const adminLogin = (login: IAdminLogin) => ({
  type: usersTypes.login,
  payload: login,
});
