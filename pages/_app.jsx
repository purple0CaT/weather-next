import { store, wrapper } from "../redux/store/store";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import "../styles/globals.css";

function MyApp({ Component, pageProps, store }) {
  return (
    // <PersistGate loading={null} persistor={persistor}>
    // <Provider store={store}>
    <Component {...pageProps} />
    // </Provider>
    // {/* </PersistGate> */}
  );
}

export default wrapper.withRedux(MyApp);
