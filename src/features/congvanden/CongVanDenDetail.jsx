import { faDownload, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useNavigate,
  useParams,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";
import { getDetailDataAsync, selectCVDForm } from "./congVanDenSlice";
import { selectLoginMa, selectLoginToken } from "../login/loginSlice";
import CongVanPreview from "../congvan/CongVanPreview";
import { selectUserLanhDao } from "../user/userSlice";
import DuyetCongVanDuyet from "../duyetcongvan/DuyetCongVanDuyet";

const XuLyItem = ({ data }) => {
  const formatDateTime = (ngay) => {
    if (!ngay) return "";
    var options = { dateStyle: "short", timeStyle: "medium" };
    var d = new Date(ngay);
    return new Intl.DateTimeFormat("vi-VN", options).format(d);
  };
  return (
    <Container fluid className="my-2">
      <Row>
        <Col sm={12} md={8}>
          {data.canbo.ma} <br /> <b>{data.canbo.holot} {data.canbo.ten}</b>
        </Col>
        <Col sm={12} md={4}>
          <p style={{ fontSize: "10px" }} className="text-end">
            {formatDateTime(data.thoigian)}
          </p>
        </Col>
      </Row>
      <p>{data.noidung}</p>
      <hr />
    </Container>
  );
};

function CongVanDenDetail() {
  const { id } = useParams();
  const _id = id.split(".")[1];
  const form = useSelector(selectCVDForm);
  const dispatch = useDispatch();
  const token = useSelector(selectLoginToken);
  const [link, setLink] = useState("");
  const [preview, setPreview] = useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const lanhdao = useSelector(selectUserLanhDao);
  const ma = useSelector(selectLoginMa);

  const formatDate = (ngay) => {
    if (!ngay) return "";
    var options = { day: "2-digit", month: "2-digit", year: "numeric" };
    var d = new Date(ngay);
    return d.toLocaleDateString("vi-VN", options);
  };

  useEffect(() => {
    document.title = "Công văn đến số " + form.so;
    dispatch(getDetailDataAsync(_id));
  }, []);

  const handleButtonPreviewClick = (el) => {
    setLink(
      `${process.env.REACT_APP_BASE_API}/${form.domat ? form.domat._id : ""}/${
        el.path
      }?token=${token}#toolbar=0&navpanes=0&scrollbar=0`
    );
    setPreview(true);
  };

  const renderTapTin = () => {
    return (
      <Table>
        <tbody>
          {form.taptin.map((el, ind) => (
            <tr key={"taptin_" + ind}>
              <td width="80%">{el.name}</td>
              <td>
                <Button
                  className="btn-neutral"
                  onClick={() => handleButtonPreviewClick(el)}
                >
                  <FontAwesomeIcon icon={faEye} className="text-primary" />
                </Button>{" "}
                <a
                  className="btn btn-neutral"
                  href={`${process.env.REACT_APP_BASE_API_DOWNLOAD_CVD}${form._id}/file/${el.path}?token=${token}`}
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faDownload} className="text-success" />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  return (
    <Container fluid className="my-3 px-5">
      <Row className="mb-3">
        <Col md={8} className="mb-2">
          <h2>Xem công văn đến</h2>
        </Col>
        <Col md={4} className="mb-2 text-end">
          <Button
            color="primary"
            className="shadow"
            onClick={() => {
              console.log(searchParams.get("r"));
              if (searchParams.get("r") !== null)
                navigate("/" + searchParams.get("r"));
              else navigate("/congvanden");
            }}
          >
            Trở về
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md={9}>
          <Card style={{ maxHeight: "75vh", overflow: "auto" }}>
            <CardBody>
              <Table bordered>
                <tbody>
                  <tr>
                    <th>Số công văn</th>
                    <td colSpan={2}>{form.so}</td>
                    <th>Loại công văn</th>
                    <td colSpan={2}>{form.loaicongvan?.ten}</td>
                  </tr>
                  <tr>
                    <th>Đơn vị phát hành</th>
                    <td colSpan={5}>{form.dv_phathanh?.ten}</td>
                  </tr>
                  <tr>
                    <th>Cán bộ nhập</th>
                    <td colSpan={5}>
                      {form.cb_nhap?.ma +
                        " | " +
                        form.cb_nhap?.holot +
                        " " +
                        form.cb_nhap?.ten}
                    </td>
                  </tr>
                  <tr>
                    <th>Cán bộ phê duyệt</th>
                    <td colSpan={5}>
                      {form.cb_pheduyet
                        ? form.cb_pheduyet.ma +
                          " | " +
                          form.cb_pheduyet.holot +
                          " " +
                          form.cb_pheduyet.ten
                        : ""}
                    </td>
                  </tr>
                  <tr>
                    <th>Cán bộ xử lý</th>
                    <td colSpan={5}>
                      {form.cb_xuly
                        ? form.cb_xuly.ma +
                          " | " +
                          form.cb_xuly.holot +
                          " " +
                          form.cb_xuly.ten
                        : ""}
                    </td>
                  </tr>
                  <tr>
                    <th width="15%">Trạng thái</th>
                    <td width="18%">{form.trangthai?.ten}</td>
                    <th width="15%">Độ mật</th>
                    <td width="18%">{form.domat?.ten}</td>
                    <th width="15%">Độ khẩn</th>
                    <td>{form.dokhan?.ten}</td>
                  </tr>
                  <tr>
                    <th>Ngày</th>
                    <td colSpan={2}>{formatDate(form.ngay)}</td>
                    <th>Hiệu lực</th>
                    <td colSpan={2}>{formatDate(form.hieuluc)}</td>
                  </tr>
                  <tr>
                    <th>Trích yếu</th>
                    <td colSpan={5}>{form.trichyeu}</td>
                  </tr>
                  <tr>
                    <th>Người ký</th>
                    <td colSpan={2}>{form.nguoiky}</td>
                    <th>Chức vụ người ký</th>
                    <td colSpan={2}>{form.chucvu_nguoiky}</td>
                  </tr>
                  <tr>
                    <th>Số tờ</th>
                    <td colSpan={2}>{form.soto}</td>
                    <th>Nơi lưu</th>
                    <td colSpan={2}>{form.noiluu}</td>
                  </tr>
                  <tr>
                    <th>Ngày đến</th>
                    <td colSpan={2}>{formatDate(form.ngayden)}</td>
                    <th>Hạn giải quyết</th>
                    <td colSpan={2}>{formatDate(form.hangiaiquyet)}</td>
                  </tr>
                  <tr>
                    <th>Ghi chú</th>
                    <td colSpan={5}>{form.ghichu}</td>
                  </tr>
                  <tr>
                    <th>ý kiến</th>
                    <td colSpan={5}>{form.ykien}</td>
                  </tr>
                  <tr>
                    <th>Tập tin</th>
                    <td colSpan={5}>{renderTapTin()}</td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
        <Col md={3}>
          <Card style={{ maxHeight: "75vh", overflow: "auto" }}>
            <CardBody>
              <div>
                {form.xuly?.map((el) => (
                  <XuLyItem key={el._id} data={el} />
                ))}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      {form.trangthai.ten === "chờ duyệt" && ma === form.cb_pheduyet.ma && (
        <Row className="mt-3">
          <Col md={12}>
            <Card>
              <CardBody>
                <DuyetCongVanDuyet id={form._id} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      )}
      <Modal isOpen={preview} size="xl">
        <ModalHeader toggle={() => dispatch(setPreview(!preview))}>
          Xem công văn
        </ModalHeader>
        <ModalBody style={{ height: "87vh" }}>
          <CongVanPreview link={link} />
        </ModalBody>
      </Modal>
    </Container>
  );
}

export default CongVanDenDetail;
