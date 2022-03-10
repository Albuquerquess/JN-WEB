import React from 'react';
import { Route, Routes as R } from 'react-router-dom';

import Login from '../pages/admin/login';
import CreateRoom from '../pages/admin/rooms/create';
import AdminRooms from '../pages/admin/rooms/list';
import Budget from '../pages/budget';
import Contacts from '../pages/contacts';
import Details from '../pages/details';
import Furnitures from '../pages/furnitures';
import Rooms from '../pages/rooms';
import Thanks from '../pages/thanks';
import Video from '../pages/video';
import ProtectedRoutes from './protectedRoutes';

const MainRoutes: React.FC = () => {
  return (
    <R>
      <Route path="/" element={<Rooms />} />
      <Route path="contato" element={<Contacts />} />
      <Route path="ambientes" element={<Rooms />} />
      <Route path="detalhes" element={<Details />} />
      <Route path="moveis" element={<Furnitures />} />
      <Route path="resumo" element={<Budget />} />
      <Route path="video" element={<Video />} />
      <Route path="obrigado" element={<Thanks />} />
      <Route path="admin">
        <Route index element={<Login />} />
        <Route path="ambientes">
          <Route
            index
            element={
              <ProtectedRoutes redirectTo="/admin">
                <AdminRooms />
              </ProtectedRoutes>
            }
          />
          <Route
            path="criar"
            element={
              <ProtectedRoutes redirectTo="/admin">
                <CreateRoom />
              </ProtectedRoutes>
            }
          />
          <Route
            path=":roomId"
            element={
              <ProtectedRoutes redirectTo="/admin">
                <CreateRoom />
              </ProtectedRoutes>
            }
          />
        </Route>
      </Route>
      <Route path="*" element={<h1>Página não encontrada</h1>} />
    </R>
  );
};

export default MainRoutes;
