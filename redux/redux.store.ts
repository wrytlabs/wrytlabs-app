import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

// splices
import { reducer as morphoScaleReducer } from './slices/morpho.scale.slice';

// store with combined reducers
export const store = configureStore({
	reducer: combineReducers({
		morphoScale: morphoScaleReducer,
	}),
	devTools: {
		serialize: {
			replacer: (_key, value) => (typeof value === 'bigint' ? value.toString() : value),
		},
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

// types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
