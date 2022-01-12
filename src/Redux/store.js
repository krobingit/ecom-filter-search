import * as redux from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import { genderReducer } from "./genderReducer";
import { brandReducer } from "./brandReducer";
import { categoryReducer } from "./categoryReducer";

const enhancers = redux.compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const persistConfig = {
  key: 'root',
  storage: storage,
transforms: [
      encryptTransform({
        secretKey: 'robinLio#$%',
        onError:  (err)=> {
        console.log(err)
       },
          }),
]

};

const rootReducer = redux.combineReducers({
 gender: genderReducer,
 brand: brandReducer,
 category:categoryReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = redux.createStore(persistedReducer, enhancers)
export const persistor = persistStore(store);