import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, Col, Container, Row, Table } from "reactstrap";
import { LoaiCongVanRow } from "./LoaiCongVanRow";
import { getDataAsync, selectLCVData } from "./loaiCongVanSlice";

export const LoaiCongVan = () => {
  const data = useSelector(selectLCVData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDataAsync());
  }, []);

  return (
    <Container fluid className="my-3 px-5">
      <Row>
        <Col md={12} className="mb-2">
          <h2>Loại công văn</h2>
        </Col>
        <Col md={12}>
          <Card>
            <Table>
              <thead>
                <tr>
                  <th>Tên loại công văn</th>
                  <th>Tên viết tắt</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.map((el, ind) => {
                  return (
                    <LoaiCongVanRow
                      key={ind}
                      ten={el.ten}
                      viettat={el.viettat}
                    />
                  );
                })}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
