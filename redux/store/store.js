// import { createWrapper } from "next-redux-wrapper";
// import { applyMiddleware, combineReducers, compose, createStore } from "redux";
// import { encryptTransform } from "redux-persist-transform-encrypt";
// import persistReducer from "redux-persist/es/persistReducer";
// import persistStore from "redux-persist/es/persistStore";
// import localStorage from "redux-persist/es/storage";
// import thunk from "redux-thunk";
// import { UserRed } from "../reducer/user";
// import { WeatherRed } from "../reducer/weather";

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// export const initialState = {
//   user: {
//     name: "",
//   },
//   weather: {
//     search: "",
//     today: {},
//     futuredays: [],
//     history: [],
//     mycord: {
//       longitude: null,
//       latitude: null,
//     },
//   },
// };

// const CombinedReducer = combineReducers({ user: UserRed, weather: WeatherRed });

// const persistConfigs = {
//   key: "root",
//   storage: localStorage,
//   transforms: [
//     encryptTransform({
//       secretKey: process.env.REACT_APP_KEYENCRIPT,
//       onError: function (error) {},
//     }),
//   ],
// };

// // const persistedReducer = persistReducer(persistConfigs, CombinedReducer);

// const configureStore = createStore(
//   //   persistedReducer,
//   CombinedReducer,
//   initialState,
//   composeEnhancers(applyMiddleware(thunk)),
// );

// // const persistor = persistStore(configureStore);
// //
// const wrapper = createWrapper(configureStore);
// //
// // export { wrapper, configureStore, persistor };
// export { wrapper, configureStore };

// ==============

import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { WeatherRed } from "../reducer/weather";
import { UserRed } from "../reducer/user";
import { createWrapper } from "next-redux-wrapper";
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
const CombinedReducer = combineReducers({ user: UserRed, weather: WeatherRed });

//Check if function running on the sever or client
const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = () =>
  createStore(
    CombinedReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk)),
  );

export const wrapper = createWrapper(store);
