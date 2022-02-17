import React from 'react';
import { Route, Routes as R } from 'react-router-dom';

import Budget from '../pages/budget';
import Contacts from '../pages/contacts';
import Details from '../pages/details';
import Furnitures from '../pages/furnitures';
import Rooms from '../pages/rooms';
import Thanks from '../pages/thanks';
import Video from '../pages/video';

const MainRoutes: React.FC = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      <Route path="*" element={<h1>Página não encontrada</h1>} />
    </R>
  );
};

export default MainRoutes;
