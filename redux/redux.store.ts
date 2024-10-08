import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

// splices
// import { reducer as ecosystemReducer } from './slices/ecosystem.slice';

// store with combined reducers
export const store = configureStore({
	reducer: combineReducers({
		// ecosystem: ecosystemReducer,
	}),
});

// types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
