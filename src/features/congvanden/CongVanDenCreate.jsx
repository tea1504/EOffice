import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Resizable } from "re-resizable";
import { useEffect, useState } from "react";
import ReactSelect from "react-select";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Tooltip,
} from "reactstrap";

function CongVanDenCreate() {
  const [tooltipSo, setToolTipSo] = useState(false);
  const [listPDF, setListPDF] = useState([]);
  const [pdf, setpdf] = useState(null);
  const handleInputFileOnChange = (e) => {
    const files = Array.from(e.target.files);
    setListPDF([]);
    files.map((el) => {
      setListPDF((prevState) => [
        ...prevState,
        { value: URL.createObjectURL(el), label: el.name },
      ]);
    });
  };
  useEffect(() => {
    return () => {
      listPDF.map((el) => {
        URL.revokeObjectURL(el);
      });
    };
  }, [listPDF]);
  return (
    <Container fluid className="my-3 px-5">
      <Row className="mb-3">
        <Col md={12} className="mb-2">
          <h2>Thêm công văn đến</h2>
        </Col>
      </Row>
      <Row>
        {pdf && (
          <Resizable defaultSize={{ width: "50%" }}>
            <Card style={{ height: "75vh" }}>
              <object data={pdf} type="application/pdf" className="w-100 h-100">
                <embed src={pdf} type="application/pdf" />
              </object>
            </Card>
          </Resizable>
        )}
        <Col>
          <Card style={{ height: "75vh", paddingBottom: "10px" }}>
            <CardHeader>
              <h4>Nhập thông tin</h4>
            </CardHeader>
            <CardBody style={{ height: "60vh", overflow: "auto" }}>
              <Form inline>
                <FormGroup>
                  <Label for="so">
                    Số công văn
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      className="text-danger mx-1"
                      id="tt"
                    />
                    <Tooltip
                      isOpen={tooltipSo}
                      target="tt"
                      toggle={() => setToolTipSo(!tooltipSo)}
                    >
                      Trường bắt buộc nhập
                    </Tooltip>
                  </Label>
                  <Input
                    type="text"
                    id="so"
                    name="so"
                    placeholder="Nhập số công văn..."
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="phathanh">
                    Đơn vị phát hành
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      className="text-danger mx-1"
                      id="tt"
                    />
                  </Label>
                  <ReactSelect
                    id="phathanh"
                    name="phathanh"
                    placeholder="Chọn đơn vị phát hành..."
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="nhan">
                    Đơn vị nhận
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      className="text-danger mx-1"
                      id="tt"
                    />
                  </Label>
                  <ReactSelect
                    isMulti
                    id="nhan"
                    name="nhan"
                    placeholder="Chọn đơn vị nhận..."
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="loaicongvan">
                    Loại công văn
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      className="text-danger mx-1"
                      id="tt"
                    />
                  </Label>
                  <ReactSelect
                    id="loaicongvan"
                    name="loaicongvan"
                    placeholder="Chọn loại công văn..."
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="domat">
                    Độ mật
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      className="text-danger mx-1"
                      id="tt"
                    />
                  </Label>
                  <ReactSelect
                    id="domat"
                    name="domat"
                    placeholder="Chọn độ mật..."
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="dokhan">
                    Độ khẩn
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      className="text-danger mx-1"
                      id="tt"
                    />
                  </Label>
                  <ReactSelect
                    id="dokhan"
                    name="dokhan"
                    placeholder="Chọn độ khẩn..."
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="ngay">
                    Ngày
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      className="text-danger mx-1"
                      id="tt"
                    />
                  </Label>
                  <Input type="date" id="ngay" name="ngay" />
                </FormGroup>
                <FormGroup>
                  <Label for="hieuluc">Hiệu lực</Label>
                  <Input type="date" id="hieuluc" name="hieuluc" />
                </FormGroup>
                <FormGroup>
                  <Label for="trichyeu">
                    Trích yếu
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      className="text-danger mx-1"
                      id="tt"
                    />
                  </Label>
                  <Input
                    type="textarea"
                    id="trichyeu"
                    name="trichyeu"
                    placeholder="Nhập trích yếu..."
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="nguoiky">
                    Họ tên người ký
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      className="text-danger mx-1"
                      id="tt"
                    />
                  </Label>
                  <Input
                    type="text"
                    id="nguoiky"
                    name="nguoiky"
                    placeholder="Nhập họ tên người ký..."
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="cv_nguoiky">
                    Chức vụ người ký
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      className="text-danger mx-1"
                      id="tt"
                    />
                  </Label>
                  <Input
                    type="text"
                    id="cv_nguoiky"
                    name="cv_nguoiky"
                    placeholder="Nhập chức vụ người ký..."
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="soto">
                    Số tờ
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      className="text-danger mx-1"
                      id="tt"
                    />
                  </Label>
                  <Input
                    type="number"
                    min={1}
                    id="soto"
                    name="soto"
                    placeholder="Nhập số tờ..."
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="noiluu">
                    Nơi lưu
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      className="text-danger mx-1"
                      id="tt"
                    />
                  </Label>
                  <Input
                    type="text"
                    id="noiluu"
                    name="noiluu"
                    placeholder="Nhập nơi lưu..."
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="ghichu">Ghi chú</Label>
                  <Input
                    type="textarea"
                    id="ghichu"
                    name="ghichu"
                    placeholder="Nhập ghi chú..."
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="hangiaiquyet">Hạn giải quyết</Label>
                  <Input type="date" id="hangiaiquyet" name="hangiaiquyet" />
                </FormGroup>
                <FormGroup>
                  <Label for="ngayden">
                    Ngày đến
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      className="text-danger mx-1"
                      id="tt"
                    />
                  </Label>
                  <Input type="date" id="ngayden" name="ngayden" />
                </FormGroup>
                <FormGroup>
                  <input
                    type="file"
                    multiple
                    onChange={handleInputFileOnChange}
                  />
                </FormGroup>
                <FormGroup>
                  <ReactSelect
                    options={listPDF}
                    onChange={(e) => setpdf(e.value)}
                  />
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CongVanDenCreate;
