import Head from "next/head";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import MainPage from "../components/home/index";
import Loader from "../components/loader/Loader";
import MainCard from "../components/weather/maincard";
import { fetchIpLocationWeather } from "../utility/utility";

export default function Home() {
  const [WeatherData, setWeatherData] = useState();
  //
  useEffect(() => {
    async function fetch() {
      const data = await fetchIpLocationWeather();
      setWeatherData(data);
    }
    fetch();
  }, []);
  return (
    <div>
      <Head>
        <title>Weather Now</title>
        <meta name="description" content="Weather application" />
      </Head>
      <Container>
        {WeatherData ? (
          <>
            {" "}
            <h1 className="text-muted text-center mt-2">Weather near you</h1>
            <MainCard data={WeatherData} />
          </>
        ) : (
          <Loader />
        )}
      </Container>
      <div>
        <MainPage />
      </div>
    </div>
  );
}

// export const getServerSideProps = async (ctx) => {
//   const data = await fetchIpLocationWeather();
//   return {
//     props: {
//       data: data,
//     },
//   };
// };
