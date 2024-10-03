import { configureStore,combineReducers,applyMiddleware } from '@reduxjs/toolkit';
import adminReducer from './adminRedux/reducer';
import summaryReducer from './summaryRedux/reducer';
import cookieReducer from './cookieRedux/reducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const StoreRedux= combineReducers({
    adminStore : adminReducer,
    summaryStore: summaryReducer,
    cookieStore: cookieReducer,
});

const store = configureStore({ reducer:StoreRedux },composeWithDevTools(applyMiddleware(thunk)))

export default store;
