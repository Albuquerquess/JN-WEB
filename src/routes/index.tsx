import React from 'react';
import { Route, Routes as R } from 'react-router-dom';

import Contacts from '../pages/contacts';
import Details from '../pages/details';
import Furnitures from '../pages/furnitures';

const MainRoutes: React.FC = () => {
  return (
    <R>
      <Route path="/" element={<Contacts />} />
      <Route path="/detalhes" element={<Details />} />
      <Route path="/moveis" element={<Furnitures />} />
    </R>
  );
};

export default MainRoutes;
