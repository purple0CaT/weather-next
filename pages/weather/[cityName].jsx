import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { Col, Container, Row } from "react-bootstrap";
import MainCard from "../../components/weather/maincard";
import { fetchWeather } from "./utility";

//
function CityWeather({ data }) {
  const router = useRouter();
  console.log(router.query.cityName);
  console.log(data.data);
  return (
    <>
      <Head>
        <title>{router.query.cityName.split(",")[0]}</title>
      </Head>
      <Container>
        <br />
        <Row>
          <Col xs="12">
            <MainCard data={data.data} />{" "}
          </Col>
          <Col xs="12">{/* <IncomingDays /> */}</Col>
        </Row>
      </Container>
    </>
  );
}
export const getServerSideProps = async (ctx) => {
  const data = await fetchWeather(ctx.query);
  return {
    props: {
      data: data,
    },
  };
};

export default CityWeather;
