import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactSelect from "react-select";
import {
  Button,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
  Tooltip,
} from "reactstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  createDataAsync,
  getDataAsync,
  onChangeFormDonVi,
  onChangeFormEmail,
  onChangeFormHoLot,
  onChangeFormMa,
  onChangeFormSdt,
  onChangeFormTen,
  resetErr,
  resetFormErr,
  selectCBForm,
  setAdd,
  toggleAdmin,
  toggleLanhDao,
  toggleVanThu,
} from "./canBoSlice";
import { resetForm } from "./canBoSlice";

function CanBoCreate({ donVi }) {
  const MySwal = withReactContent(Swal);
  const [tooltipMa, setTooltipMa] = useState(false);
  const dispatch = useDispatch();
  const form = useSelector(selectCBForm);

  useEffect(() => {
    dispatch(resetForm());
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(resetFormErr());
    dispatch(createDataAsync(form));
    dispatch(getDataAsync());
  };

  useEffect(() => {
    if (form.isSubmitted)
      MySwal.fire({
        title: <h1>Lưu thành công</h1>,
        text: `Đã lưu ${form.ten} vào hệ thống`,
        icon: "success",
        footer: "EOffice &copy; 2022",
      }).then(() => {
        dispatch(resetForm());
        dispatch(setAdd(false));
      });
  }, [form.isSubmitted]);

  return (
    <Form onSubmit={handleFormSubmit}>
      <FormGroup row>
        <Label for="ma" md={2}>
          <b>Mã cán bộ</b>
          <FontAwesomeIcon
            icon={faCircleInfo}
            className="mx-1 text-danger"
            id="iconMa"
          />
        </Label>
        <Tooltip
          isOpen={tooltipMa}
          toggle={() => setTooltipMa(!tooltipMa)}
          target="iconMa"
        >
          Trường bắt buộc nhập
        </Tooltip>
        <Col md={10}>
          <Input
            className="input-custom"
            type="text"
            id="ma"
            invalid={form.errMa}
            value={form.ma}
            onChange={(e) => dispatch(onChangeFormMa(e.target.value))}
          />
          <FormFeedback>{form.errMa}</FormFeedback>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="holot" md={2}>
          <b>Họ và tên lót</b>
          <FontAwesomeIcon
            icon={faCircleInfo}
            className="mx-1 text-danger"
            id="iconMa"
          />
        </Label>
        <Col md={5}>
          <Input
            className="input-custom"
            type="text"
            id="holot"
            invalid={form.errHoLot}
            value={form.holot}
            onChange={(e) => dispatch(onChangeFormHoLot(e.target.value))}
          />
          <FormFeedback>{form.errHoLot}</FormFeedback>
        </Col>
        <Label for="ten" md={1}>
          <b>Tên</b>
          <FontAwesomeIcon
            icon={faCircleInfo}
            className="mx-1 text-danger"
            id="iconMa"
          />
        </Label>
        <Col md={4}>
          <Input
            className="input-custom"
            type="text"
            id="ten"
            invalid={form.errTen}
            value={form.ten}
            onChange={(e) => dispatch(onChangeFormTen(e.target.value))}
          />
          <FormFeedback>{form.errTen}</FormFeedback>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="donvi" md={2}>
          <b>Đơn vị</b>
          <FontAwesomeIcon
            icon={faCircleInfo}
            className="mx-1 text-danger"
            id="iconMa"
          />
        </Label>
        <Col md={10}>
          <ReactSelect
            placeholder="Chọn đơn vị..."
            options={donVi}
            className={clsx({ "is-invalid": form.errDonVi !== null })}
            getOptionLabel={(option) => option.ten}
            getOptionValue={(option) => option._id}
            onChange={(e) => dispatch(onChangeFormDonVi(e._id))}
          />
          <FormFeedback>{form.errDonVi}</FormFeedback>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="email" md={2}>
          <b>Địa chỉ email</b>
          <FontAwesomeIcon
            icon={faCircleInfo}
            className="mx-1 text-danger"
            id="iconMa"
          />
        </Label>
        <Col md={10}>
          <Input
            className="input-custom"
            type="text"
            id="email"
            invalid={form.errEmail}
            value={form.email}
            onChange={(e) => dispatch(onChangeFormEmail(e.target.value))}
          />
          <FormFeedback>{form.errEmail}</FormFeedback>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="sdt" md={2}>
          <b>Số điện thoại</b>
          <FontAwesomeIcon
            icon={faCircleInfo}
            className="mx-1 text-danger"
            id="iconMa"
          />
        </Label>
        <Col md={10}>
          <Input
            className="input-custom"
            type="text"
            id="sdt"
            invalid={form.errsdt}
            value={form.sdt}
            onChange={(e) => dispatch(onChangeFormSdt(e.target.value))}
          />
          <FormFeedback>{form.errsdt}</FormFeedback>
        </Col>
      </FormGroup>
      <Row>
        <Col md={2}>
          <Label>
            <b>Quyền</b>
          </Label>
        </Col>
        <Col md={10}>
          <FormGroup check inline>
            <Input
              type="checkbox"
              id="admin"
              checked={form.laadmin}
              onClick={() => dispatch(toggleAdmin(!form.laadmin))}
            />
            <Label for="admin" check>
              Admin
            </Label>
          </FormGroup>
          <FormGroup check inline>
            <Input
              type="checkbox"
              id="lanhdao"
              checked={form.lalanhdao}
              onClick={() => dispatch(toggleLanhDao(!form.lalanhdao))}
            />
            <Label for="lanhdao" check>
              Lãnh đạo
            </Label>
          </FormGroup>
          <FormGroup check inline>
            <Input
              type="checkbox"
              id="vanthu"
              checked={form.lavanthu}
              onClick={() => dispatch(toggleVanThu(!form.lavanthu))}
            />
            <Label for="vanthu" check>
              Văn thư
            </Label>
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <Button className="btn-neutral w-100">
          <b>Thêm mới</b>
        </Button>
      </FormGroup>
    </Form>
  );
}

export default CanBoCreate;
