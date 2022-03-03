import { combineReducers } from 'redux';

import admin from './admin';
import contacts from './contacts';
import details from './details';
import furnitures from './furnitures';

export const reducers = combineReducers({
  admin,
  contacts,
  details,
  furnitures,
});

export type IStorageState = ReturnType<typeof reducers>;
