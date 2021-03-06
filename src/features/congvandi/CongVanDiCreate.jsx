import {
  faInfoCircle,
  faPlus,
  faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { Resizable } from "re-resizable";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
import DonViBenNgoaiCreate from "../admin/donvi/DonViBenNgoaiCreate";
import style from "./CongVanDi.module.css";
import {
  selectDVData,
  selectDVErr,
  resetErr as resetErrDV,
  getDataByClericalAssistantAsync,
  selectDVAdd,
  setAdd as setDVAdd,
} from "../admin/donvi/donViSlice";
import ReactSelect from "react-select";
import { selectUserDonVi } from "../user/userSlice";
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
import {
  createDataAsync,
  onChangeFormCBTrangThai,
  onChangeFormChucVuNguoiKy,
  onChangeFormDK,
  onChangeFormDM,
  onChangeFormDVNhan,
  onChangeFormEmailND,
  onChangeFormEmailSend,
  onChangeFormEmailTitle,
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
  selectCVDiForm,
} from "./congVanDiSlice";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function CongVanDiCreate() {
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const [pdf, setpdf] = useState(null);
  const addDV = useSelector(selectDVAdd);
  const dispatch = useDispatch();
  const [tooltipSo, setToolTipSo] = useState(false);
  const [tooltipDM, setToolTipDM] = useState(false);
  const [tooltipDK, setToolTipDK] = useState(false);
  const [tooltipBTN, setToolTipBTN] = useState(false);
  const dvPhatHanh = useSelector(selectDVData);
  const donViUser = useSelector(selectUserDonVi);
  const refDVNhan = useRef(null);
  const refDM = useRef(null);
  const refDK = useRef(null);
  const refCBPD = useRef(null);
  const refFile = useRef(null);
  const lcv = useSelector(selectLCVData);
  const dm = useSelector(selectDMData);
  const dk = useSelector(selectDKData);
  const tt = useSelector(selectTTData);
  const [listPDF, setListPDF] = useState([]);
  const form = useSelector(selectCVDiForm);
  const refLCV = useRef(null);

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
    dispatch(resetForm());
    dispatch(getDataByClericalAssistantAsync());
    dispatch(getLCV());
    dispatch(getDM());
    dispatch(getDK());
    dispatch(getTT());
    const yyyymmdd = (date) => {
      var mm = date.getMonth() + 1;
      var dd = date.getDate();
      return [
        date.getFullYear(),
        (mm > 9 ? "" : "0") + mm,
        (dd > 9 ? "" : "0") + dd,
      ].join("-");
    };
    dispatch(onChangeFormNgayDi(yyyymmdd(new Date())));
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
        refDVNhan.current.clearValue();
        refLCV.current.clearValue();
        refDM.current.clearValue();
        refDK.current.clearValue();
        refCBPD.current.clearValue();
        refFile.current.clearValue();
        dispatch(onChangeFormCBTrangThai(tt[0]._id));
      });
  }, [form.isSubmitted]);

  return (
    <Container fluid className="my-3 px-5">
      <Row className="mb-3">
        <Col md={8} className="mb-2">
          <h2>Th??m c??ng v??n ??i</h2>
        </Col>
        <Col md={4} className="mb-2 text-end">
          <Button
            color="primary"
            className="shadow"
            onClick={() => navigate("/congvandi")}
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
                    name="socvd"
                    placeholder="Nh???p s??? c??ng v??n..."
                    invalid={form.errso != null}
                  />
                  <FormFeedback>{form.errso}</FormFeedback>
                </FormGroup>
                {/* nhan */}
                <FormGroup>
                  <Label for="nhan">
                    ????n v??? nh???n
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
                        options={dvPhatHanh}
                        getOptionLabel={(option) => option.ten}
                        getOptionValue={(option) => option._id}
                        isMulti
                        isClearable
                        id="nhan"
                        name="nhan"
                        placeholder="Ch???n ????n v??? nh???n..."
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
                      <Tooltip
                        target="btn"
                        isOpen={tooltipBTN}
                        toggle={() => setToolTipBTN(!tooltipBTN)}
                      >
                        Th??m ????n v???
                      </Tooltip>
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
                    name="loaicongvandi"
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
                    name="trichyeucvd"
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
                    name="nguoikycvd"
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
                    name="cv_nguoikycvd"
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
                    name="sotocvd"
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
                    name="noiluucvd"
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
                {/* ngaydi */}
                <FormGroup>
                  <Label for="ngaydi">
                    Ng??y ??i
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
                {/* hantraloi */}
                <FormGroup>
                  <Label for="hantraloi">H???n tr??? l???i</Label>
                  <Input
                    value={form.hantraloi}
                    type="date"
                    id="hantraloi"
                    name="hantraloi"
                    min={form.ngaydi}
                    onChange={(e) =>
                      dispatch(onChangeFormHanTraLoi(e.target.value))
                    }
                  />
                </FormGroup>
                {/* Send email */}
                <FormGroup>
                  <Input
                    type="checkbox"
                    id="sendemail"
                    checked={form.email_send}
                    onChange={() =>
                      dispatch(onChangeFormEmailSend(!form.email_send))
                    }
                  />{" "}
                  <Label check for="sendemail">
                    {" "}
                    G???i email
                  </Label>
                </FormGroup>
                {form.email_send && (
                  <FormGroup>
                    <Container fluid>
                      <Row>
                        <Col md={12}>
                          <h3 className="text-center">G???i mail th??ng b??o</h3>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <Card className="shadow">
                            <CardBody>
                              <FormGroup className="row">
                                <Label md={2}>Ti??u ?????</Label>
                                <Col md={10}>
                                  <Input
                                    value={form.email_title}
                                    type="text"
                                    placeholder="Ti??u ????? email"
                                    onChange={(e) =>
                                      dispatch(
                                        onChangeFormEmailTitle(e.target.value)
                                      )
                                    }
                                  />
                                </Col>
                              </FormGroup>
                              <FormGroup className="row">
                                <Label md={2}>N???i dung</Label>
                                <Col md={10}>
                                  <CKEditor
                                    editor={ClassicEditor}
                                    data={form.email_nd}
                                    onChange={(event, editor) => {
                                      const data = editor.getData();
                                      dispatch(onChangeFormEmailND(data));
                                      console.log({ event, editor, data });
                                    }}
                                  />
                                </Col>
                              </FormGroup>
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </Container>
                  </FormGroup>
                )}
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

export default CongVanDiCreate;
