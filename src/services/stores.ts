import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './reducers';

const logger = (store: any) => (next: (arg0: any) => any) => (action: any) => {
  // console.group(action);
  // console.info('dispatching', action);
  let result = next(action);
  // console.groupEnd();
  return result;
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(logger),
});

export default store;
