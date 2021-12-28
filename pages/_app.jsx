import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../components/navbar/navbar";
import { wrapper } from "../redux/store/store";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    // <Provider store={store}>
    //   <PersistGate persistor={persistor} loading={null}>
    <NavBar>
      <Component {...pageProps} />
    </NavBar>

    //   {/* </PersistGate>
    // </Provider> */}
  );
}

export default wrapper.withRedux(MyApp);
