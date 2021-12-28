import { useRouter } from "next/router";
import { Col, Container, Row } from "react-bootstrap";
import IncomingDays from "./incomingdays";
import MainCard from "./maincard";

function CityWeather() {
  const router = useRouter();
  return (
    <Container>
      <br />
      <Row>
        <Col xs="12">
          <MainCard />
        </Col>
        <Col xs="12">
          <IncomingDays />
        </Col>
      </Row>
    </Container>
  );
}

export default CityWeather;
