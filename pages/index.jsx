import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Weather Now</title>
        <meta name="description" content="Weather application" />
      </Head>
      <div>
        <h1>Home page</h1>
      </div>
    </div>
  );
}
