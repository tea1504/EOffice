import { Alert, Col, Container, Row } from "reactstrap";

function Home() {
  return (
    <Container fluid>
      <Row>
        <Col className="col-md-12">
          <Alert color="primary">
            <h2>Home Page</h2>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
