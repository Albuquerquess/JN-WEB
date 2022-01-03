import React from 'react';
import { Route, Routes as R } from 'react-router-dom';

import Contacts from '../pages/contacts';

const MainRoutes: React.FC = () => {
  return (
    <R>
      <Route path="/" element={<Contacts />} />
    </R>
  );
};

export default MainRoutes;
