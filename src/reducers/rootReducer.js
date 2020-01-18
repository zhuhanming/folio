import { combineReducers } from 'redux';

import components from 'reducers/componentDux';

const rootReducer = combineReducers({
  components
});

export default rootReducer;
