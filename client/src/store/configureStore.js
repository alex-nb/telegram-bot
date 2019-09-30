import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import employeesReducer from './reducers/employees';
import chatBotsReducer from './reducers/chatBots';
import testsReducer from './reducers/tests';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [thunk]

export default () => {
  const store = createStore(
    combineReducers({
        employees: employeesReducer,
        chatBots: chatBotsReducer,
        tests: testsReducer,
        form: formReducer
    }),
    composeEnhancers(applyMiddleware(...middleware))
  );

  return store;
};
