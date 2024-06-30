import {combineReducers} from 'redux';
import appReducers from './appReducers';
import {type} from '@utils';

const appReducer = combineReducers({
  appReducers,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === type.RESET_ALL_REDUCERS) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
