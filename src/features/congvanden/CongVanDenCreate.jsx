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
  Table,
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
import { selectUserDonVi } from "../user/userSlice";
import { useNavigate } from "react-router-dom";

function CongVanDenCreate() {
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const [tooltipSo, setToolTipSo] = useState(false);
  const [tooltipDM, setToolTipDM] = useState(false);
  const [tooltipDK, setToolTipDK] = useState(false);
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
  const refDVNhan = useRef(null);
  const refLCV = useRef(null);
  const refDM = useRef(null);
  const refDK = useRef(null);
  const refCBPD = useRef(null);
  const refFile = useRef(null);
  const donViUser = useSelector(selectUserDonVi);
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
    dispatch(resetForm());
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

  useEffect(() => {
    if (tt.length > 0) dispatch(onChangeFormCBTrangThai(tt[0]._id));
  }, [tt]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(resetFormErr());
    dispatch(createDataAsync(form));
  };

  useEffect(() => {
    if (form.isSubmitted)
      MySwal.fire({
        title: <h1>L??u th??nh c??ng</h1>,
        text: `???? l??u c??ng v??n ${form.so} v??o h??? th???ng`,
        icon: "success",
        footer: "EOffice &copy; 2022",
      }).then(() => {
        dispatch(resetForm());
        dispatch(resetFormErr());
        refDVPhatHanh.current.clearValue();
        refLCV.current.clearValue();
        refDM.current.clearValue();
        refDK.current.clearValue();
        refCBPD.current.clearValue();
        refFile.current.clearValue();
        dispatch(onChangeFormCBTrangThai(tt[0]._id));
      });
  }, [form.isSubmitted]);

  const renderTrangThai = () => {
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
          <h2>Th??m c??ng v??n ?????n</h2>
        </Col>
        <Col md={4} className="mb-2 text-end">
          <Button
            color="primary"
            className="shadow"
            onClick={() => navigate("/congvanden")}
          >
            Tr??? v???
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
            className={clsx(style.relative, "shadow")}
          >
            <CardHeader>
              <h4>Nh???p th??ng tin</h4>
            </CardHeader>
            <CardBody style={{ height: "60vh", overflow: "auto" }}>
              <Form inline onSubmit={handleFormSubmit}>
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
                    placeholder="Ch???n file mu???n xem..."
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
                {/* so */}
                <FormGroup>
                  <Label for="so">
                    S??? c??ng v??n
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
                      Tr?????ng b???t bu???c nh???p
                    </Tooltip>
                  </Label>
                  <Input
                    value={form.so}
                    onChange={(e) => dispatch(onChangeFormSo(e.target.value))}
                    type="text"
                    id="so"
                    name="so"
                    placeholder="Nh???p s??? c??ng v??n..."
                    invalid={form.errso != null}
                  />
                  <FormFeedback>{form.errso}</FormFeedback>
                </FormGroup>
                {/* phathanh */}
                <FormGroup>
                  <Label for="phathanh">
                    ????n v??? ph??t h??nh
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
                        isClearable
                        getOptionLabel={(option) => option.ten}
                        getOptionValue={(option) => option._id}
                        id="phathanh"
                        name="phathanh"
                        placeholder="Ch???n ????n v??? ph??t h??nh..."
                        onChange={(e) => {
                          if (!e) {
                            e = {
                              target: refDVPhatHanh,
                              value: "",
                            };
                            dispatch(onChangeFormDVPhatHanh(""));
                          } else dispatch(onChangeFormDVPhatHanh(e._id));
                        }}
                        className={clsx({
                          "is-invalid": form.errdv_phathanh != null,
                        })}
                        styles={{
                          control: (base, state) => ({
                            ...base,
                            borderColor:
                              form.errdv_phathanh != null
                                ? "#dc3545"
                                : "hsl(0, 0%, 80%)",
                          }),
                        }}
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
                {/* loaicv */}
                <FormGroup>
                  <Label for="loaicongvan">
                    Lo???i c??ng v??n
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      className="text-danger mx-1"
                      id="tt"
                    />
                  </Label>
                  <ReactSelect
                    ref={refLCV}
                    options={lcv}
                    getOptionLabel={(option) => option.ten}
                    getOptionValue={(option) => option._id}
                    id="loaicongvan"
                    name="loaicongvan"
                    isClearable
                    placeholder="Ch???n lo???i c??ng v??n..."
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
                    ????? m???t
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
                      ????? tr???ng n???u kh??ng m???t
                    </Tooltip>
                  </Label>
                  <ReactSelect
                    ref={refDM}
                    options={dm}
                    getOptionLabel={(option) => option.ten}
                    getOptionValue={(option) => option._id}
                    isClearable
                    id="domat"
                    name="domat"
                    placeholder="Ch???n ????? m???t..."
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
                    ????? kh???n
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
                      ????? tr???ng n???u kh??ng kh???n
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
                    placeholder="Ch???n ????? kh???n..."
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
                    Ng??y
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
                  <Label for="hieuluc">Hi???u l???c</Label>
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
                {/* Tr??ch y???u */}
                <FormGroup>
                  <Label for="trichyeu">
                    Tr??ch y???u
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
                    placeholder="Nh???p tr??ch y???u..."
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
                    H??? t??n ng?????i k??
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
                    placeholder="Nh???p h??? t??n ng?????i k??..."
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
                    Ch???c v??? ng?????i k??
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
                    placeholder="Nh???p ch???c v??? ng?????i k??..."
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
                    S??? t???
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
                    placeholder="Nh???p s??? t???..."
                    onChange={(e) => dispatch(onChangeFormSoTo(e.target.value))}
                    invalid={form.errsoto != null}
                  />
                  <FormFeedback>{form.errsoto}</FormFeedback>
                </FormGroup>
                {/* noiluu */}
                <FormGroup>
                  <Label for="noiluu">
                    N??i l??u
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
                    placeholder="Nh???p n??i l??u..."
                    onChange={(e) =>
                      dispatch(onChangeFormNoiLuu(e.target.value))
                    }
                    invalid={form.errnoiluu != null}
                  />
                  <FormFeedback>{form.errnoiluu}</FormFeedback>
                </FormGroup>
                {/* ghichu */}
                <FormGroup>
                  <Label for="ghichu">Ghi ch??</Label>
                  <Input
                    value={form.ghichu}
                    type="textarea"
                    id="ghichu"
                    name="ghichu"
                    placeholder="Nh???p ghi ch??..."
                    onChange={(e) =>
                      dispatch(onChangeFormGhiChu(e.target.value))
                    }
                  />
                </FormGroup>
                {/* ngayden */}
                <FormGroup>
                  <Label for="ngayden">
                    Ng??y ?????n
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
                {/* hangiaiquyet */}
                <FormGroup>
                  <Label for="hangiaiquyet">H???n gi???i quy???t</Label>
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
                {/* trangthai */}
                <FormGroup>
                  <Label for="trangthai">
                    Tr???ng th??i
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      className="text-danger mx-1"
                      id="tt"
                    />
                  </Label>
                  {renderTrangThai()}
                  <FormFeedback>{form.errtrangthai}</FormFeedback>
                </FormGroup>
                {/* CBDuyet */}
                <FormGroup>
                  <Label for="cb_pheduyet">Ch???n c??n b??? duy???t</Label>
                  <ReactSelect
                    ref={refCBPD}
                    options={cbld}
                    getOptionLabel={(option) =>
                      option.ma + " | " + option.holot + " " + option.ten
                    }
                    isClearable
                    getOptionValue={(option) => option._id}
                    id="cb_pheduyet"
                    name="cb_pheduyet"
                    placeholder="Ch???n c??n b??? ph?? duy???t..."
                    onChange={(e) => {
                      if (!e) {
                        e = {
                          target: refCBPD,
                          value: "",
                        };
                        dispatch(onChangeFormCBDuyet(e._id));
                      }
                      dispatch(onChangeFormCBDuyet(e._id));
                    }}
                  />
                </FormGroup>
                <br />
                <Button color="primary" className={clsx(style.absolute)}>
                  L??u c??ng v??n
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Modal isOpen={addDV} size="xl">
        <ModalHeader toggle={() => dispatch(setDVAdd(false))}>
          <FontAwesomeIcon icon={faPlusSquare} className="mx-2" />
          Th??m ????n v??? m???i
        </ModalHeader>
        <ModalBody>
          <DonViBenNgoaiCreate />
        </ModalBody>
      </Modal>
    </Container>
  );
}

export default CongVanDenCreate;
