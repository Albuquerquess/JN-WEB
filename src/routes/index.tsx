import React from 'react';
import { Route, Routes as R } from 'react-router-dom';

import CreateFurniture from '../pages/admin/furnitures/create';
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
  const adminRoutes = [
    {
      path: '/admin/ambientes',
      element: <AdminRooms />,
    },
    {
      path: '/admin/ambientes/criar',
      element: <CreateRoom />,
    },
    {
      path: '/admin/ambientes/:roomId',
      element: <CreateRoom />,
    },
    {
      path: '/admin/ambientes/:roomId/movel/criar',
      element: <CreateFurniture />,
    },
    {
      path: '/admin/ambientes/:roomId/movel/:furnitureId',
      element: <CreateFurniture />,
    },
  ];
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

        {adminRoutes.map(adminRoute => (
          <Route
            path={adminRoute.path}
            element={
              <ProtectedRoutes redirectTo="/admin">
                {adminRoute.element}
              </ProtectedRoutes>
            }
          />
        ))}
      </Route>
      <Route path="*" element={<h1>Página não encontrada</h1>} />
    </R>
  );
};

export default MainRoutes;
