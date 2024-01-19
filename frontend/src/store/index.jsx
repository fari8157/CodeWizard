import { configureStore } from "@reduxjs/toolkit";
import {themeReducer} from "./them_slice";
import { Clientreducer } from "./UserAuth";
import {persistStore,persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session";

const persistConfig={
    key:'theme',
    storage: storageSession, 
}

const persistThemeSlice=persistReducer(persistConfig,themeReducer)
const persistClientReducer=persistReducer(persistConfig,Clientreducer)
 export const store =configureStore({
    reducer:{
        theme:persistThemeSlice,
        Client:persistClientReducer,
    }
})

export const persistor=persistStore(store)