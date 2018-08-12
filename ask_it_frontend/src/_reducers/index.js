import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { questions } from './question.reducer'; 

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  questions,
  alert
});

export default rootReducer;