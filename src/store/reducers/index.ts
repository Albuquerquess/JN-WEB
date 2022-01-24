import { combineReducers } from 'redux';

import contacts from './contacts';
import details from './details';

export const reducers = combineReducers({
  contacts,
  details,
});

export type reducersType = ReturnType<typeof reducers>;
