import "bootstrap/dist/css/bootstrap.min.css";
import { PersistGate } from "redux-persist/integration/react";
import NavBar from "../components/navbar/navbar";
import { makeStore, wrapper } from "../redux/store/store";
import "../styles/globals.css";
import { useStore } from "react-redux";

function MyApp({ Component, pageProps }) {
  const store = useStore();
  return (
    <NavBar>
      <PersistGate persistor={store.__persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </NavBar>
  );
}

export default wrapper.withRedux(MyApp);
