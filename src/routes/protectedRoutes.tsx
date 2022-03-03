import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { IAppState } from '../store/types';

interface IPropsProtectedRoutes {
  children: React.ReactElement;
  redirectTo: string;
}

const ProtectedRoutes = ({ children, redirectTo }: IPropsProtectedRoutes) => {
  const token = useSelector((state: IAppState) => state.admin.token);
  return token ? children : <Navigate to={redirectTo} />;
};

export default ProtectedRoutes;
