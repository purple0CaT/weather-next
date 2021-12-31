import Head from "next/head";
import { Container } from "react-bootstrap";
import MainPage from "../components/home/index";
import MainCard from "../components/weather/maincard";
import { fetchIpLocationWeather } from "../utility/utility";

export default function Home({ data }) {
  return (
    <div>
      <Head>
        <title>Weather Now</title>
        <meta name="description" content="Weather application" />
      </Head>
      <Container>
        <h1 className="text-muted text-center mt-2">Weather near you</h1>
        <MainCard data={data} />
      </Container>
      <div>
        <MainPage />
      </div>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const data = await fetchIpLocationWeather();
  // console.log(data);
  return {
    props: {
      data: data,
    },
  };
};
