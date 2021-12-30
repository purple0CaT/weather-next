import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import MyCord from "../../components/profile/MyCord";
import SearchHistory from "../../components/profile/SearchHistory";
//
const MyProfile = () => {
  const user = useSelector((state) => state.user);
  const router = useRouter();
  //
  useEffect(() => {
    if (!user.name) {
      router.push("/");
    }
  }, []);
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Container>
        <h2 className="text-center text-muted my-2"> Hello , {user.name}!</h2>
        <Row>
          <Col xs="12" md="6">
            <MyCord />
          </Col>
          <Col xs="12" md="6">
            <SearchHistory />
          </Col>
        </Row>
      </Container>
    </>
  );
};
//

export default MyProfile;
