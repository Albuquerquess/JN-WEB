import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { reducers } from './reducers';

const persistConfig = {
  key: 'JN',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const store: any = createStore(persistedReducer);

const persistor = persistStore(store);

export { store, persistor };
