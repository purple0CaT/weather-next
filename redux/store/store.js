import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { UserRed } from "../reducer/user";
import { WeatherRed } from "../reducer/weather";
//
export const initialState = {
  user: {
    name: "",
  },
  weather: {
    search: "",
    today: {},
    futuredays: [],
    history: [],
    mycord: {
      longitude: null,
      latitude: null,
    },
  },
};
//Check if function running on the sever or client
const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
// All reducers
const CombinedReducer = combineReducers({
  user: UserRed,
  weather: WeatherRed,
});
// Create store
export const makeStore = (ctx) => {
  if (ctx.isServer) {
    //If it's on server side, create a store
    return createStore(
      CombinedReducer,
      initialState,
      composeEnhancers(applyMiddleware(thunk)),
    );
  } else {
    //If it's on client side, create a store which will persis
    const persistConfig = {
      key: "root",
      storage: storage,
      transforms: [
        encryptTransform({
          secretKey: `${process.env.KEYENCRIPT}`,
          onError: function (error) {},
        }),
      ],
    };
    //
    const persistedReducer = persistReducer(persistConfig, CombinedReducer);
    const store = createStore(
      persistedReducer,
      initialState,
      composeEnhancers(applyMiddleware(thunk)),
    );
    store.__persisitor = persistStore(store);
    //
    return store;
  }
};
export const wrapper = createWrapper(makeStore);
