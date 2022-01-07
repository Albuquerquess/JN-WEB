import React from 'react';
import { Route, Routes as R } from 'react-router-dom';

import Contacts from '../pages/contacts';
import Details from '../pages/details';

const MainRoutes: React.FC = () => {
  return (
    <R>
      <Route path="/" element={<Contacts />} />
      <Route path="/detalhes" element={<Details />} />
    </R>
  );
};

export default MainRoutes;
