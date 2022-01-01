import Head from "next/head";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import IncomingDays from "../../components//weather/incomingdays";
import MainCard from "../../components/weather/maincard";
import { addHistory } from "../../redux/actions/actions";
import { fetchWeather } from "../../utility/utility";
//
function CityWeather({ data }) {
  const weather = useSelector((state) => state.weather);
  const dispatch = useDispatch();
  console.log(data.data);
  //
  useEffect(() => {
    let historyCheck = weather.history.findIndex(
      (w) =>
        w.name === data.data.name && w.sys.country === data.data.sys.country,
    );
    if (historyCheck < 0) {
      dispatch(addHistory(data.data));
    }
  }, []);
  return (
    <>
      <Head>
        <title>{data.data.name}</title>
      </Head>
      <Container>
        <br />
        <Row>
          <Col xs="12">
            <MainCard data={data.data} />{" "}
          </Col>
          <Col xs="12" className="px-1">
            {" "}
            <IncomingDays data={data.data} multipData={data.multipData} />{" "}
          </Col>
        </Row>
      </Container>
    </>
  );
}
export const getServerSideProps = async (ctx) => {
  const data = await fetchWeather({
    cityName: ctx.params.cityName,
    cord: [ctx.query.lat, ctx.query.lon],
  });
  return {
    props: {
      data: data,
    },
  };
};

export default CityWeather;
