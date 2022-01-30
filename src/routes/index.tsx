import React from 'react';
import { Route, Routes as R } from 'react-router-dom';

import Contacts from '../pages/contacts';
import Details from '../pages/details';
import Furnitures from '../pages/furnitures';
import Video from '../pages/video';

const MainRoutes: React.FC = () => {
  return (
    <R>
      <Route path="/" element={<Contacts />} />
      <Route path="/detalhes" element={<Details />} />
      <Route path="/moveis" element={<Furnitures />} />
      <Route path="/video" element={<Video />} />
    </R>
  );
};

export default MainRoutes;