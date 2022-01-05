import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import { Router } from "next/router";
import { useState } from "react";
import { useStore } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Loader from "../components/loader/Loader";
import NavBar from "../components/navbar/index";
import { wrapper } from "../redux/store/store";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const store = useStore();
  const [Loading, setLoading] = useState(false);
  //
  Router.events.on("routeChangeStart", (url) => {
    setLoading(true);
  });
  Router.events.on("routeChangeComplete", (url) => {
    setLoading(false);
  });
  Router.events.on("routeChangeError", (url) => {
    setLoading(false);
  });
  return (
    <PersistGate persistor={store.__persistor}>
      <Head>
        {" "}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar>
        {Loading && (
          <div style={{ position: "absolute", width: "100%" }}>
            <Loader />
          </div>
        )}
        <Component {...pageProps} />
      </NavBar>
    </PersistGate>
  );
}

export default wrapper.withRedux(MyApp);
