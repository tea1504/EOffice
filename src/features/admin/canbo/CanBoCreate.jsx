import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  Tooltip,
} from "reactstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  onChangeFormDonVi,
  onChangeFormHoLot,
  onChangeFormMa,
  onChangeFormTen,
  selectCBForm,
} from "./canBoSlice";

function CanBoCreate({ donVi }) {
  const MySwal = withReactContent(Swal);
  const [tooltipMa, setTooltipMa] = useState(false);
  const dispatch = useDispatch();
  const form = useSelector(selectCBForm);
  console.log(form);

  return (
    <Form>
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
            value={form.ma}
            onChange={(e) => dispatch(onChangeFormMa(e.target.value))}
          />
          <FormFeedback></FormFeedback>
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
            value={form.holot}
            onChange={(e) => dispatch(onChangeFormHoLot(e.target.value))}
          />
          <FormFeedback></FormFeedback>
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
            value={form.ten}
            onChange={(e) => dispatch(onChangeFormTen(e.target.value))}
          />
          <FormFeedback></FormFeedback>
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
            value={0}
            options={donVi}
            getOptionLabel={(option) => option.ten}
            getOptionValue={(option) => option._id}
            onChange={(e) => dispatch(onChangeFormDonVi(e._id))}
          />
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
          <Input className="input-custom" type="text" id="email" />
          <FormFeedback></FormFeedback>
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
          <Input className="input-custom" type="text" id="sdt" />
          <FormFeedback></FormFeedback>
        </Col>
      </FormGroup>
      <FormGroup>
        <Button className="btn-neutral w-100">
          <b>Thêm mới</b>
        </Button>
      </FormGroup>
    </Form>
  );
}

export default CanBoCreate;
