import React from 'react';
import { Route, Routes as R } from 'react-router-dom';

import Budget from '../pages/budget';
import Contacts from '../pages/contacts';
import Details from '../pages/details';
import Furnitures from '../pages/furnitures';
import Thanks from '../pages/thanks';
import Video from '../pages/video';

const MainRoutes: React.FC = () => {
  return (
    <R>
      <Route path="/" element={<Contacts />} />
      <Route path="/detalhes" element={<Details />} />
      <Route path="/moveis" element={<Furnitures />} />
      <Route path="/video" element={<Video />} />
      <Route path="/orcamento" element={<Budget />} />
      <Route path="/obrigado" element={<Thanks />} />
    </R>
  );
};

export default MainRoutes;
