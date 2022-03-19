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
  createDataAsync,
  getDataAsync,
  onChangeTen,
  onChangeViettat,
  resetForm,
  selectLCVData,
  selectLCVForm,
} from "./loaiCongVanSlice";

function LoaiCongVanCreate() {
  const MySwal = withReactContent(Swal);
  const [tooltipName, setTooltipName] = useState(false);
  const [tooltipAbbreviation, setTooltipAbbreviation] = useState(false);
  const form = useSelector(selectLCVForm);
  const data = useSelector(selectLCVData);
  const dispatch = useDispatch();

  const handleButtonClick = (e) => {
    e.preventDefault();
    dispatch(createDataAsync(form));
    dispatch(getDataAsync());
  };

  useEffect(() => {
    dispatch(resetForm());
  }, []);

  useEffect(() => {
    dispatch(onChangeTen(""));
    dispatch(onChangeViettat(""));
  }, [data.length]);

  useEffect(() => {
    if (form.isSubmitted)
      MySwal.fire({
        title: <h1>OK</h1>,
        text: "Lưu thành công",
        icon: "info",
        footer: "EOffice &copy; 2022",
      }).then(() => {
        dispatch(resetForm());
      });
  }, [form.isSubmitted]);

  return (
    <div>
      <Form>
        <FormGroup>
          <Label>
            <b>Tên loại công văn</b>
            <FontAwesomeIcon
              icon={faCircleInfo}
              className="mx-1 text-muted"
              id="iconName"
            />
            <Tooltip
              innerClassName="tooltip-background"
              target="iconName"
              isOpen={tooltipName}
              toggle={() => setTooltipName(!tooltipName)}
            >
              Trường bắt buộc nhập
            </Tooltip>
          </Label>
          <Input
            className="input-custom"
            type="text"
            value={form.ten}
            invalid={!!form.errTen}
            onChange={(e) => dispatch(onChangeTen(e.target.value))}
          />
          <FormFeedback>{form.errTen}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label>
            <b>Tên viết tắt</b>
            <FontAwesomeIcon
              icon={faCircleInfo}
              className="mx-1 text-muted"
              id="iconAbbreviation"
            />
          </Label>
          <Tooltip
            innerClassName="tooltip-background"
            target="iconAbbreviation"
            isOpen={tooltipAbbreviation}
            toggle={() => setTooltipAbbreviation(!tooltipAbbreviation)}
          >
            Trường bắt buộc nhập
          </Tooltip>
          <Input
            className="input-custom"
            type="text"
            value={form.viettat}
            invalid={!!form.errVT || form.errVT == "Tên viết tắt bị trùng"}
            onChange={(e) => dispatch(onChangeViettat(e.target.value))}
          />
          <FormFeedback>{form.errVT}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Button className="btn-neutral w-100" onClick={handleButtonClick}>
            <b>Thêm mới</b>
          </Button>
        </FormGroup>
      </Form>
    </div>
  );
}

export default LoaiCongVanCreate;
