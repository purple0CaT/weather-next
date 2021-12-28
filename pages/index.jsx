import Head from "next/head";
import styles from "../styles/Home.module.css";
import MainPage from "../components/home/index";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Weather Now</title>
        <meta name="description" content="Weather application" />
      </Head>
      <div>
        <MainPage />
      </div>
    </div>
  );
}
