import {
  faInfoCircle,
  faPlus,
  faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Resizable } from "re-resizable";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactSelect from "react-select";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Tooltip,
} from "reactstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  selectDVData,
  selectDVErr,
  resetErr as resetErrDV,
  getDataByClericalAssistantAsync,
  selectDVAdd,
  setAdd as setDVAdd,
} from "../admin/donvi/donViSlice";
import {
  createDataAsync,
  onChangeFormCBDuyet,
  onChangeFormCBTrangThai,
  onChangeFormChucVuNguoiKy,
  onChangeFormDK,
  onChangeFormDM,
  onChangeFormDVNhan,
  onChangeFormDVPhatHanh,
  onChangeFormGhiChu,
  onChangeFormHanGiaiQuyet,
  onChangeFormHieuLuc,
  onChangeFormLCV,
  onChangeFormNgay,
  onChangeFormNgayDen,
  onChangeFormNGuoiKy,
  onChangeFormNoiLuu,
  onChangeFormSo,
  onChangeFormSoTo,
  onChangeFormTapTin,
  onChangeFormTrichYeu,
  resetForm,
  resetFormErr,
  selectCVDForm,
} from "./congVanDenSlice";
import {
  getDataAsync as getLCV,
  selectLCVData,
} from "../admin/loaicongvan/loaiCongVanSlice";
import { getDataAsync as getDM, selectDMData } from "../admin/domat/doMatSlice";
import {
  getDataAsync as getDK,
  selectDKData,
} from "../admin/dokhan/doKhanSlice";
import {
  getDataAsync as getTT,
  selectTTData,
} from "../admin/trangthai/trangThaiSlice";
import { getDataLanhDaoAsync, selectCBData } from "../admin/canbo/canBoSlice";
import DonViBenNgoaiCreate from "../admin/donvi/DonViBenNgoaiCreate";
import clsx from "clsx";
import style from "./CongVanDen.module.css";

function CongVanDenCreate() {
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const [tooltipSo, setToolTipSo] = useState(false);
  const [tooltipBTN, setToolTipBTN] = useState(false);
  const [listPDF, setListPDF] = useState([]);
  const [pdf, setpdf] = useState(null);
  const dvPhatHanh = useSelector(selectDVData);
  const errDV = useSelector(selectDVErr);
  const form = useSelector(selectCVDForm);
  const lcv = useSelector(selectLCVData);
  const dm = useSelector(selectDMData);
  const dk = useSelector(selectDKData);
  const tt = useSelector(selectTTData);
  const cbld = useSelector(selectCBData);
  const addDV = useSelector(selectDVAdd);
  const refDVPhatHanh = useRef(null);

  const handleInputFileOnChange = (e) => {
    dispatch(onChangeFormTapTin(e.target.files));
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

  useEffect(() => {
    if (errDV)
      MySwal.fire({
        title: <h1>Error {errDV.status}</h1>,
        text: errDV.data,
        icon: "error",
        footer: "EOffice &copy; 2022",
      }).then(() => {
        dispatch(resetErrDV());
      });
  }, [errDV]);

  useEffect(() => {
    dispatch(getDataByClericalAssistantAsync());
    dispatch(getLCV());
    dispatch(getDM());
    dispatch(getDK());
    dispatch(getTT());
    dispatch(getDataLanhDaoAsync());
    const yyyymmdd = (date) => {
      var mm = date.getMonth() + 1;
      var dd = date.getDate();
      return [
        date.getFullYear(),
        (mm > 9 ? "" : "0") + mm,
        (dd > 9 ? "" : "0") + dd,
      ].join("-");
    };
    dispatch(onChangeFormNgayDen(yyyymmdd(new Date())));
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(resetFormErr());
    dispatch(createDataAsync(form));
  };

  useEffect(() => {
    if (form.isSubmitted)
      MySwal.fire({
        title: <h1>Lưu thành công</h1>,
        text: `Đã lưu công văn ${form.so} vào hệ thống`,
        icon: "success",
        footer: "EOffice &copy; 2022",
      }).then(() => {
        dispatch(resetForm());
        dispatch(resetFormErr());
        console.log(refDVPhatHanh.current.value);
        refDVPhatHanh.current.value = null;
      });
  }, [form.isSubmitted]);

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
          <Card
            style={{ height: "75vh", paddingBottom: "10px" }}
            className={clsx(style.relative)}
          >
            <CardHeader>
              <h4>Nhập thông tin</h4>
            </CardHeader>
            <CardBody style={{ height: "60vh", overflow: "auto" }}>
              <Form inline onSubmit={handleFormSubmit}>
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
                    value={form.so}
                    onChange={(e) => dispatch(onChangeFormSo(e.target.value))}
                    type="text"
                    id="so"
                    name="so"
                    placeholder="Nhập số công văn..."
                    invalid={form.errso != null}
                  />
                  <FormFeedback>{form.errso}</FormFeedback>
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
                  <Row>
                    <Col sm={11}>
                      <ReactSelect
                        ref={refDVPhatHanh}
                        options={dvPhatHanh}
                        getOptionLabel={(option) => option.ten}
                        getOptionValue={(option) => option._id}
                        id="phathanh"
                        name="phathanh"
                        placeholder="Chọn đơn vị phát hành..."
                        onChange={(e) =>
                          dispatch(onChangeFormDVPhatHanh(e._id))
                        }
                        className={clsx({
                          "is-invalid": form.errdv_phathanh != null,
                        })}
                      />
                      <FormFeedback>{form.errdv_phathanh}</FormFeedback>
                    </Col>
                    <Col sm={1}>
                      <Button
                        color="primary"
                        className="w-100"
                        id="btn"
                        onClick={() => dispatch(setDVAdd(true))}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </Button>
                    </Col>
                  </Row>
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
                  <Row>
                    <Col sm={11}>
                      <ReactSelect
                        options={dvPhatHanh}
                        getOptionLabel={(option) => option.ten}
                        getOptionValue={(option) => option._id}
                        isMulti
                        id="nhan"
                        name="nhan"
                        placeholder="Chọn đơn vị nhận..."
                        onChange={(e) => dispatch(onChangeFormDVNhan(e))}
                        className={clsx({
                          "is-invalid": form.errdv_nhan != null,
                        })}
                      />
                      <FormFeedback>{form.errdv_nhan}</FormFeedback>
                    </Col>
                    <Col sm={1}>
                      <Button
                        color="primary"
                        className="w-100"
                        id="btn"
                        onClick={() => dispatch(setDVAdd(true))}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </Button>
                      <Tooltip
                        target="btn"
                        isOpen={tooltipBTN}
                        toggle={() => setToolTipBTN(!tooltipBTN)}
                      >
                        Thêm đơn vị
                      </Tooltip>
                    </Col>
                  </Row>
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
                    options={lcv}
                    getOptionLabel={(option) => option.ten}
                    getOptionValue={(option) => option._id}
                    id="loaicongvan"
                    name="loaicongvan"
                    placeholder="Chọn loại công văn..."
                    onChange={(e) => dispatch(onChangeFormLCV(e._id))}
                    className={clsx({
                      "is-invalid": form.errloaicongvan != null,
                    })}
                  />
                  <FormFeedback>{form.errloaicongvan}</FormFeedback>
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
                    options={dm}
                    getOptionLabel={(option) => option.ten}
                    getOptionValue={(option) => option._id}
                    id="domat"
                    name="domat"
                    placeholder="Chọn độ mật..."
                    onChange={(e) => dispatch(onChangeFormDM(e._id))}
                    className={clsx({ "is-invalid": form.errdomat != null })}
                  />
                  <FormFeedback>{form.errdomat}</FormFeedback>
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
                    options={dk}
                    getOptionLabel={(option) => option.ten}
                    getOptionValue={(option) => option._id}
                    id="dokhan"
                    name="dokhan"
                    placeholder="Chọn độ khẩn..."
                    onChange={(e) => dispatch(onChangeFormDK(e._id))}
                    className={clsx({ "is-invalid": form.errdokhan != null })}
                  />
                  <FormFeedback>{form.errdokhan}</FormFeedback>
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
                  <Input
                    value={form.ngay}
                    type="date"
                    id="ngay"
                    name="ngay"
                    onChange={(e) => dispatch(onChangeFormNgay(e.target.value))}
                    invalid={form.errngay != null}
                  />
                  <FormFeedback>{form.errngay}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="hieuluc">Hiệu lực</Label>
                  <Input
                    value={form.hieuluc}
                    type="date"
                    id="hieuluc"
                    name="hieuluc"
                    min={form.ngay}
                    onChange={(e) =>
                      dispatch(onChangeFormHieuLuc(e.target.value))
                    }
                  />
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
                    value={form.trichyeu}
                    type="textarea"
                    id="trichyeu"
                    name="trichyeu"
                    placeholder="Nhập trích yếu..."
                    onChange={(e) =>
                      dispatch(onChangeFormTrichYeu(e.target.value))
                    }
                    invalid={form.errtrichyeu != null}
                  />
                  <FormFeedback>{form.errtrichyeu}</FormFeedback>
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
                    value={form.nguoiky}
                    type="text"
                    id="nguoiky"
                    name="nguoiky"
                    placeholder="Nhập họ tên người ký..."
                    onChange={(e) =>
                      dispatch(onChangeFormNGuoiKy(e.target.value))
                    }
                    invalid={form.errnguoiky != null}
                  />
                  <FormFeedback>{form.errnguoiky}</FormFeedback>
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
                    value={form.chucvu_nguoiky}
                    type="text"
                    id="cv_nguoiky"
                    name="cv_nguoiky"
                    placeholder="Nhập chức vụ người ký..."
                    onChange={(e) =>
                      dispatch(onChangeFormChucVuNguoiKy(e.target.value))
                    }
                    invalid={form.errchucvu_nguoiky != null}
                  />
                  <FormFeedback>{form.errchucvu_nguoiky}</FormFeedback>
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
                    value={form.soto}
                    type="number"
                    min={1}
                    id="soto"
                    name="soto"
                    placeholder="Nhập số tờ..."
                    onChange={(e) => dispatch(onChangeFormSoTo(e.target.value))}
                    invalid={form.errsoto != null}
                  />
                  <FormFeedback>{form.errsoto}</FormFeedback>
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
                    value={form.noiluu}
                    type="text"
                    id="noiluu"
                    name="noiluu"
                    placeholder="Nhập nơi lưu..."
                    onChange={(e) =>
                      dispatch(onChangeFormNoiLuu(e.target.value))
                    }
                    invalid={form.errnoiluu != null}
                  />
                  <FormFeedback>{form.errnoiluu}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="ghichu">Ghi chú</Label>
                  <Input
                    value={form.ghichu}
                    type="textarea"
                    id="ghichu"
                    name="ghichu"
                    placeholder="Nhập ghi chú..."
                    onChange={(e) =>
                      dispatch(onChangeFormGhiChu(e.target.value))
                    }
                  />
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
                  <Input
                    value={form.ngayden}
                    type="date"
                    id="ngayden"
                    name="ngayden"
                    min={form.ngay}
                    onChange={(e) =>
                      dispatch(onChangeFormNgayDen(e.target.value))
                    }
                    invalid={form.errngayden != null}
                  />
                  <FormFeedback>{form.errngayden}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="hangiaiquyet">Hạn giải quyết</Label>
                  <Input
                    value={form.hangiaiquyet}
                    type="date"
                    id="hangiaiquyet"
                    name="hangiaiquyet"
                    min={form.ngayden}
                    onChange={(e) =>
                      dispatch(onChangeFormHanGiaiQuyet(e.target.value))
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="trangthai">
                    Trạng thái
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      className="text-danger mx-1"
                      id="tt"
                    />
                  </Label>
                  <ReactSelect
                    options={tt}
                    defaultValue={tt[0]}
                    getOptionLabel={(option) => option.ten}
                    getOptionValue={(option) => option._id}
                    id="trangthai"
                    name="trangthai"
                    placeholder="Chọn trạng thái..."
                    onChange={(e) => dispatch(onChangeFormCBTrangThai(e._id))}
                    className={clsx({
                      "is-invalid": form.errtrangthai != null,
                    })}
                  />
                  <FormFeedback>{form.errtrangthai}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="cb_pheduyet">Chọn cán bộ duyệt</Label>
                  <ReactSelect
                    options={cbld}
                    getOptionLabel={(option) =>
                      option.ma + " | " + option.holot + " " + option.ten
                    }
                    getOptionValue={(option) => option._id}
                    id="cb_pheduyet"
                    name="cb_pheduyet"
                    placeholder="Chọn cán bộ phê duyệt..."
                    onChange={(e) => dispatch(onChangeFormCBDuyet(e._id))}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="file"
                    multiple
                    onChange={handleInputFileOnChange}
                    invalid={form.errtaptin != null}
                  />
                  <FormFeedback>{form.errtaptin}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <ReactSelect
                    options={listPDF}
                    placeholder="Chọn file muốn xem..."
                    onChange={(e) => setpdf(e.value)}
                  />
                </FormGroup>
                <br />
                <Button color="primary" className={clsx(style.absolute)}>
                  Lưu công văn
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Modal isOpen={addDV} size="xl">
        <ModalHeader toggle={() => dispatch(setDVAdd(false))}>
          <FontAwesomeIcon icon={faPlusSquare} className="mx-2" />
          Thêm đơn vị mới
        </ModalHeader>
        <ModalBody>
          <DonViBenNgoaiCreate />
        </ModalBody>
      </Modal>
    </Container>
  );
}

export default CongVanDenCreate;
