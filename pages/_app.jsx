import "bootstrap/dist/css/bootstrap.min.css";
import { useStore } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import NavBar from "../components/navbar/navbar";
import { wrapper } from "../redux/store/store";
import "../styles/globals.css";

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
