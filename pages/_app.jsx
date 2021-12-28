import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../components/navbar/navbar";
import { wrapper } from "../redux/store/store";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <NavBar>
      <Component {...pageProps} />
    </NavBar>
  );
}

export default wrapper.withRedux(MyApp);
