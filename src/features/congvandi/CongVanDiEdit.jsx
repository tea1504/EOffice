import {
  faInfoCircle,
  faPlus,
  faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Resizable } from "re-resizable";
import { useEffect, useRef, useState } from "react";
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
  editDataAsync,
  formatDate,
  getSimpleDetailDataAsync,
  onChangeFormCBDuyet,
  onChangeFormCBTrangThai,
  onChangeFormChucVuNguoiKy,
  onChangeFormDK,
  onChangeFormDM,
  onChangeFormDVNhan,
  onChangeFormGhiChu,
  onChangeFormHanTraLoi,
  onChangeFormHieuLuc,
  onChangeFormLCV,
  onChangeFormNgay,
  onChangeFormNgayDi,
  onChangeFormNGuoiKy,
  onChangeFormNoiLuu,
  onChangeFormSo,
  onChangeFormSoTo,
  onChangeFormTapTin,
  onChangeFormTrichYeu,
  resetForm,
  resetFormErr,
  resetTapTin,
  selectCVDiForm,
} from "./congVanDiSlice";
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
import DonViBenNgoaiCreate from "../admin/donvi/DonViBenNgoaiCreate";
import clsx from "clsx";
import style from "./CongVanDi.module.css";
import { useNavigate, useParams } from "react-router-dom";

function CongVanDiEdit() {
  const { id } = useParams();
  const _id = id.split(".")[1];
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const [tooltipSo, setToolTipSo] = useState(false);
  const [tooltipDM, setToolTipDM] = useState(false);
  const [tooltipDK, setToolTipDK] = useState(false);
  const [listPDF, setListPDF] = useState([]);
  const [pdf, setpdf] = useState(null);
  const dvNhan = useSelector(selectDVData);
  const errDV = useSelector(selectDVErr);
  const form = useSelector(selectCVDiForm);
  const lcv = useSelector(selectLCVData);
  const dm = useSelector(selectDMData);
  const dk = useSelector(selectDKData);
  const tt = useSelector(selectTTData);
  const addDV = useSelector(selectDVAdd);
  const refDVNhan = useRef(null);
  const refLCV = useRef(null);
  const refDM = useRef(null);
  const refDK = useRef(null);
  const refFile = useRef(null);
  const navigate = useNavigate();

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
    dispatch(resetForm());
    dispatch(getSimpleDetailDataAsync(_id));
  }, []);

  useEffect(() => {
    dispatch(formatDate());
    dispatch(resetTapTin());
    refDVNhan.current.setValue(
      dvNhan.filter((el) => form.dv_nhan.includes(el._id))
    );
    refLCV.current.setValue(lcv.filter((el) => el._id === form.loaicongvan)[0]);
    refDM.current.setValue(dm.filter((el) => el._id === form.domat)[0]);
    refDK.current.setValue(dk.filter((el) => el._id === form.dokhan)[0]);
  }, [form._id]);

  useEffect(() => {
    if (tt.length > 0) dispatch(onChangeFormCBTrangThai(tt[0]._id));
  }, [tt]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(resetFormErr());
    dispatch(editDataAsync(form));
  };

  useEffect(() => {
    if (form.isSubmitted)
      MySwal.fire({
        title: <h1>Lưu thành công</h1>,
        text: `Đã lưu công văn ${form.so} vào hệ thống`,
        icon: "success",
        footer: "EOffice &copy; 2022",
      }).then(() => {
        dispatch(resetFormErr());
        dispatch(resetForm());
        dispatch(getSimpleDetailDataAsync(_id));
      });
  }, [form.isSubmitted]);

  const renderTrangThai = () => {
    if (form.trangthai._id)
      return (
        <FormGroup row>
          {tt.map((el, ind) => {
            return (
              <Col key={"tt" + ind}>
                <Input
                  type="radio"
                  name="tt"
                  id={"tt_" + el._id}
                  checked={form.trangthai._id === el._id}
                  onChange={() => dispatch(onChangeFormCBTrangThai(el._id))}
                />{" "}
                <Label for={"tt_" + el._id}>{el.ten}</Label>
              </Col>
            );
          })}
        </FormGroup>
      );
    else
      return (
        <FormGroup row>
          {tt.map((el, ind) => {
            return (
              <Col key={"tt" + ind}>
                <Input
                  type="radio"
                  name="tt"
                  id={"tt_" + el._id}
                  checked={form.trangthai === el._id}
                  onChange={() => dispatch(onChangeFormCBTrangThai(el._id))}
                />{" "}
                <Label for={"tt_" + el._id}>{el.ten}</Label>
              </Col>
            );
          })}
        </FormGroup>
      );
  };

  return (
    <Container fluid className="my-3 px-5">
      <Row className="mb-3">
        <Col md={8} className="mb-2">
          <h2>Cập nhật công văn đi</h2>
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
              <h4>Cập nhật thông tin</h4>
            </CardHeader>
            <CardBody style={{ height: "60vh", overflow: "auto" }}>
              <Form inline onSubmit={handleFormSubmit}>
                {/* so */}
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
                {/* nhan */}
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
                        ref={refDVNhan}
                        options={dvNhan}
                        getOptionLabel={(option) => option.ten}
                        getOptionValue={(option) => option._id}
                        isMulti
                        isClearable
                        id="nhan"
                        name="nhan"
                        placeholder="Chọn đơn vị nhận..."
                        onChange={(e) => dispatch(onChangeFormDVNhan(e))}
                        className={clsx({
                          "is-invalid": form.errdv_nhan != null,
                        })}
                        styles={{
                          control: (base, state) => ({
                            ...base,
                            borderColor:
                              form.errdv_nhan != null
                                ? "#dc3545"
                                : "hsl(0, 0%, 80%)",
                          }),
                        }}
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
                    </Col>
                  </Row>
                </FormGroup>
                {/* loaicv */}
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
                    ref={refLCV}
                    options={lcv}
                    defaultValue={form.loaicongvan}
                    getOptionLabel={(option) => option.ten}
                    getOptionValue={(option) => option._id}
                    id="loaicongvan"
                    name="loaicongvan"
                    isClearable
                    placeholder="Chọn loại công văn..."
                    onChange={(e) => {
                      if (!e) {
                        e = {
                          target: refLCV,
                          value: "",
                        };
                        dispatch(onChangeFormLCV(""));
                      } else dispatch(onChangeFormLCV(e._id));
                    }}
                    className={clsx({
                      "is-invalid": form.errloaicongvan != null,
                    })}
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        borderColor:
                          form.errloaicongvan != null
                            ? "#dc3545"
                            : "hsl(0, 0%, 80%)",
                      }),
                    }}
                  />
                  <FormFeedback>{form.errloaicongvan}</FormFeedback>
                </FormGroup>
                {/* domat */}
                <FormGroup>
                  <Label for="domat">
                    Độ mật
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      className="text-danger mx-1"
                      id="dmtt"
                    />
                    <Tooltip
                      isOpen={tooltipDM}
                      target="dmtt"
                      toggle={() => setToolTipDM(!tooltipDM)}
                    >
                      Để trống nếu không mật
                    </Tooltip>
                  </Label>
                  <ReactSelect
                    ref={refDM}
                    options={dm}
                    defaultValue={form.domat}
                    getOptionLabel={(option) => option.ten}
                    getOptionValue={(option) => option._id}
                    isClearable
                    id="domat"
                    name="domat"
                    placeholder="Chọn độ mật..."
                    onChange={(e) => {
                      if (!e) {
                        e = {
                          target: refDM,
                          value: "",
                        };
                        dispatch(onChangeFormDM(""));
                      }
                      dispatch(onChangeFormDM(e._id));
                    }}
                  />
                  <FormFeedback>{form.errdomat}</FormFeedback>
                </FormGroup>
                {/* dokhan */}
                <FormGroup>
                  <Label for="dokhan">
                    Độ khẩn
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      className="text-danger mx-1"
                      id="dktt"
                    />
                    <Tooltip
                      isOpen={tooltipDK}
                      target="dktt"
                      toggle={() => setToolTipDK(!tooltipDK)}
                    >
                      Để trống nếu không khẩn
                    </Tooltip>
                  </Label>
                  <ReactSelect
                    ref={refDK}
                    options={dk}
                    getOptionLabel={(option) => option.ten}
                    getOptionValue={(option) => option._id}
                    isClearable
                    id="dokhan"
                    name="dokhan"
                    placeholder="Chọn độ khẩn..."
                    onChange={(e) => {
                      if (!e) {
                        e = {
                          target: refDK,
                          value: "",
                        };
                        dispatch(onChangeFormDK(""));
                      }
                      dispatch(onChangeFormDK(e._id));
                    }}
                  />
                  <FormFeedback>{form.errdokhan}</FormFeedback>
                </FormGroup>
                {/* ngay */}
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
                {/* hieuluc */}
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
                {/* Trích yếu */}
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
                {/* nguoiky */}
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
                {/* cv_nguoiky */}
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
                {/* soto */}
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
                {/* noiluu */}
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
                {/* ghichu */}
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
                {/* ngayden */}
                <FormGroup>
                  <Label for="ngayden">
                    Ngày đi
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      className="text-danger mx-1"
                      id="tt"
                    />
                  </Label>
                  <Input
                    value={form.ngaydi}
                    type="date"
                    id="ngaydi"
                    name="ngaydi"
                    min={form.ngay}
                    onChange={(e) =>
                      dispatch(onChangeFormNgayDi(e.target.value))
                    }
                    invalid={form.errngaydi != null}
                  />
                  <FormFeedback>{form.errngaydi}</FormFeedback>
                </FormGroup>
                {/* hangiaiquyet */}
                <FormGroup>
                  <Label for="hangiaiquyet">Hạn giải quyết</Label>
                  <Input
                    value={form.hangiaiquyet}
                    type="date"
                    id="hangiaiquyet"
                    name="hangiaiquyet"
                    min={form.ngayden}
                    onChange={(e) =>
                      dispatch(onChangeFormHanTraLoi(e.target.value))
                    }
                  />
                </FormGroup>
                {/* Chon file */}
                <FormGroup>
                  <Input
                    type="file"
                    multiple
                    onChange={handleInputFileOnChange}
                    invalid={form.errtaptin != null}
                  />
                  <FormFeedback>{form.errtaptin}</FormFeedback>
                </FormGroup>
                {/* Xem file */}
                <FormGroup>
                  <ReactSelect
                    ref={refFile}
                    options={listPDF}
                    isClearable
                    placeholder="Chọn file muốn xem..."
                    onChange={(e) => {
                      if (!e) {
                        e = {
                          target: refFile,
                          value: "",
                        };
                        setpdf(null);
                      } else setpdf(e.value);
                    }}
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

export default CongVanDiEdit;
