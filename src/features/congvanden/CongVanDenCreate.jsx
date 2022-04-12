import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Resizable } from "re-resizable";
import { useEffect, useMemo, useState } from "react";
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
  FormGroup,
  Input,
  Label,
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
} from "../admin/donvi/donViSlice";
import {
  createDataAsync,
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
} from '../admin/trangthai/trangThaiSlice';

function CongVanDenCreate() {
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const [tooltipSo, setToolTipSo] = useState(false);
  const [listPDF, setListPDF] = useState([]);
  const [pdf, setpdf] = useState(null);
  const dvPhatHanh = useSelector(selectDVData);
  const errDV = useSelector(selectDVErr);
  const form = useSelector(selectCVDForm);
  const lcv = useSelector(selectLCVData);
  const dm = useSelector(selectDMData);
  const dk = useSelector(selectDKData);
  const tt = useSelector(selectTTData);

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
    dispatch(createDataAsync(form));
  };
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
                    options={dvPhatHanh}
                    getOptionLabel={(option) => option.ten}
                    getOptionValue={(option) => option._id}
                    id="phathanh"
                    name="phathanh"
                    placeholder="Chọn đơn vị phát hành..."
                    onChange={(e) => dispatch(onChangeFormDVPhatHanh(e._id))}
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
                    options={dvPhatHanh}
                    getOptionLabel={(option) => option.ten}
                    getOptionValue={(option) => option._id}
                    isMulti
                    id="nhan"
                    name="nhan"
                    placeholder="Chọn đơn vị nhận..."
                    onChange={(e) => dispatch(onChangeFormDVNhan(e))}
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
                    options={lcv}
                    getOptionLabel={(option) => option.ten}
                    getOptionValue={(option) => option._id}
                    id="loaicongvan"
                    name="loaicongvan"
                    placeholder="Chọn loại công văn..."
                    onChange={(e) => dispatch(onChangeFormLCV(e._id))}
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
                    options={dm}
                    getOptionLabel={(option) => option.ten}
                    getOptionValue={(option) => option._id}
                    id="domat"
                    name="domat"
                    placeholder="Chọn độ mật..."
                    onChange={(e) => dispatch(onChangeFormDM(e._id))}
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
                    options={dk}
                    getOptionLabel={(option) => option.ten}
                    getOptionValue={(option) => option._id}
                    id="dokhan"
                    name="dokhan"
                    placeholder="Chọn độ khẩn..."
                    onChange={(e) => dispatch(onChangeFormDK(e._id))}
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
                  <Input
                    value={form.ngay}
                    type="date"
                    id="ngay"
                    name="ngay"
                    onChange={(e) => dispatch(onChangeFormNgay(e.target.value))}
                  />
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
                    value={form.nguoiky}
                    type="text"
                    id="nguoiky"
                    name="nguoiky"
                    placeholder="Nhập họ tên người ký..."
                    onChange={(e) =>
                      dispatch(onChangeFormNGuoiKy(e.target.value))
                    }
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
                    value={form.chucvu_nguoiky}
                    type="text"
                    id="cv_nguoiky"
                    name="cv_nguoiky"
                    placeholder="Nhập chức vụ người ký..."
                    onChange={(e) =>
                      dispatch(onChangeFormChucVuNguoiKy(e.target.value))
                    }
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
                    value={form.soto}
                    type="number"
                    min={1}
                    id="soto"
                    name="soto"
                    placeholder="Nhập số tờ..."
                    onChange={(e) => dispatch(onChangeFormSoTo(e.target.value))}
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
                    value={form.noiluu}
                    type="text"
                    id="noiluu"
                    name="noiluu"
                    placeholder="Nhập nơi lưu..."
                    onChange={(e) =>
                      dispatch(onChangeFormNoiLuu(e.target.value))
                    }
                  />
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
                  />
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
                  <Label for="trangthai">Trạng thái</Label>
                  <ReactSelect
                    options={tt}
                    defaultValue={tt[0]}
                    getOptionLabel={(option) => option.ten}
                    getOptionValue={(option) => option._id}
                    id="trangthai"
                    name="trangthai"
                    placeholder="Chọn trạng thái..."
                    onChange={(e) => dispatch(onChangeFormDK(e._id))}
                  />
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
                <FormGroup>
                  <Button>Lưu</Button>
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
