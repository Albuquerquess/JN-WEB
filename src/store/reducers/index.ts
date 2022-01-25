import { combineReducers } from 'redux';

import contacts from './contacts';
import details from './details';
import furnitures from './furnitures';

export const reducers = combineReducers({
  contacts,
  details,
  furnitures,
});

export type reducersType = ReturnType<typeof reducers>;
