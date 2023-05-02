import type { Reducer } from "@reduxjs/toolkit";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import storage from "redux-persist/lib/storage";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, persistStore } from "redux-persist";
import { getPersistConfig } from "redux-deep-persist";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";

import user from "./user";
import ui from "./ui";

type CombinedState = typeof rootReducer extends Reducer<infer U, any> ? U : never;

const rootReducer = combineReducers({
	user,
	ui,
});

const persistConfig = getPersistConfig({
	key: "root",
	storage,
	version: 1,
	whitelist: ["user.auth.access_token", "ui"],
	rootReducer,
});

persistConfig.stateReconciler = hardSet as (inboundState: CombinedState) => CombinedState;

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export type IRootState = ReturnType<typeof store.getState>;
export type IAppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export const useAppDispatch = () => useDispatch<IAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
