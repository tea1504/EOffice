import { faDownload, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";
import { selectLoginToken } from "../login/loginSlice";
import CongVanPreview from "../congvan/CongVanPreview";
import { getDetailDataAsync, selectCVDiForm } from "./congVanDiSlice";
import clsx from "clsx";
import style from "./CongVanDi.module.css";

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
          {data.canbo.ma} | {data.canbo.holot} {data.canbo.ten}
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

function CongVanDiDetail() {
  const { id } = useParams();
  const _id = id.split(".")[1];
  const form = useSelector(selectCVDiForm);
  const dispatch = useDispatch();
  const token = useSelector(selectLoginToken);
  const [link, setLink] = useState("");
  const [preview, setPreview] = useState(false);
  const navigate = useNavigate();

  const formatDate = (ngay) => {
    if (!ngay) return "";
    var options = { day: "2-digit", month: "2-digit", year: "numeric" };
    var d = new Date(ngay);
    return d.toLocaleDateString("vi-VN", options);
  };

  useEffect(() => {
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
                  href={`${process.env.REACT_APP_BASE_API_DOWNLOAD_CVDi}${form._id}/file/${el.path}?token=${token}`}
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
            onClick={() => navigate("/congvandi")}
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
                    <td>{form.so}</td>
                    <th>Loại công văn</th>
                    <td>{form.loaicongvan?.ten}</td>
                  </tr>
                  <tr>
                    <th>Đơn vị nhận</th>
                    <td colSpan={3}>
                      {
                        <div>
                          {form.dv_nhan.map((el) => (
                            <div
                              key={el._id}
                              className={clsx(style.myBadge)}
                            >
                              {el.ten}
                            </div>
                          ))}
                        </div>
                      }
                    </td>
                  </tr>
                  <tr>
                    <th>Cán bộ nhập</th>
                    <td colSpan={3}>
                      {form.cb_nhap?.ma +
                        " | " +
                        form.cb_nhap?.holot +
                        " " +
                        form.cb_nhap?.ten}
                    </td>
                  </tr>
                  <tr>
                    <th>Cán bộ phê duyệt</th>
                    <td colSpan={3}>
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
                    <td colSpan={3}>
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
                    <th width="20%">Độ mật</th>
                    <td width="25%">{form.domat?.ten}</td>
                    <th width="20%">Độ khẩn</th>
                    <td>{form.dokhan?.ten}</td>
                  </tr>
                  <tr>
                    <th>Ngày</th>
                    <td>{formatDate(form.ngay)}</td>
                    <th>Hiệu lực</th>
                    <td>{formatDate(form.hieuluc)}</td>
                  </tr>
                  <tr>
                    <th>Trích yếu</th>
                    <td colSpan={3}>{form.trichyeu}</td>
                  </tr>
                  <tr>
                    <th>Người ký</th>
                    <td>{form.nguoiky}</td>
                    <th>Chức vụ người ký</th>
                    <td>{form.chucvu_nguoiky}</td>
                  </tr>
                  <tr>
                    <th>Số tờ</th>
                    <td>{form.soto}</td>
                    <th>Nơi lưu</th>
                    <td>{form.noiluu}</td>
                  </tr>
                  <tr>
                    <th>Ngày đi</th>
                    <td>{formatDate(form.ngaydi)}</td>
                    <th>Hạn trả lời</th>
                    <td>{formatDate(form.hantraloi)}</td>
                  </tr>
                  <tr>
                    <th>Ghi chú</th>
                    <td colSpan={3}>{form.ghichu}</td>
                  </tr>
                  <tr>
                    <th>Tập tin</th>
                    <td colSpan={3}>{renderTapTin()}</td>
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

export default CongVanDiDetail;
