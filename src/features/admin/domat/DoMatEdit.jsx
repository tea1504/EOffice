import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
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
  editDataAsync,
  getDataAsync,
  onChangeFormTen,
  resetForm,
  resetFormErr,
  selectDMForm,
  setEdit,
} from "./doMatSlice";

function DoMatEdit() {
  const MySwal = withReactContent(Swal);
  const [tooltip, setTooltip] = useState(false);
  const form = useSelector(selectDMForm);
  const dispatch = useDispatch();

  const handleButtonClick = (e) => {
    e.preventDefault();
    dispatch(editDataAsync(form));
    dispatch(getDataAsync());
  };

  useEffect(() => {
    dispatch(resetFormErr());
  }, []);

  useEffect(() => {
    if (form.isSubmitted)
      MySwal.fire({
        title: <h1>Lưu thành công</h1>,
        text: `Đã lưu ${form.ten} vào hệ thống`,
        icon: "success",
        footer: "EOffice &copy; 2022",
      }).then(() => {
        dispatch(resetForm());
        dispatch(setEdit(false));
      });
  }, [form.isSubmitted]);

  return (
    <Form>
      <FormGroup>
        <Label>
          <b>Tên độ khẩn</b>
          <FontAwesomeIcon
            icon={faCircleInfo}
            className="mx-1 text-muted"
            id="iconName"
          />
          <Tooltip
            target="iconName"
            isOpen={tooltip}
            toggle={() => setTooltip(!tooltip)}
          >
            Trường bắt buộc nhập
          </Tooltip>
        </Label>
        <Input
          className="input-custom"
          type="text"
          invalid={form.errTen}
          value={form.ten}
          onChange={(e) => dispatch(onChangeFormTen(e.target.value))}
        />
        <FormFeedback>{form.errTen}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Button className="btn-neutral w-100" onClick={handleButtonClick}>
          <b>Chỉnh sửa</b>
        </Button>
      </FormGroup>
    </Form>
  );
}

export default DoMatEdit;
