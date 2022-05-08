import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactSelect from "react-select";
import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  getDuLieuTheoUserAsync,
  selectCBData,
} from "../admin/canbo/canBoSlice";
import { duyetCVAsync, getDetailDataAsync, onChangeFormCBXuLy, onChangeFormYKien, selectCVDForm, setIsSubmited } from "../congvanden/congVanDenSlice";

function DuyetCongVanDuyet({ id }) {
  const MySwal = withReactContent(Swal);
  var refCBDuyet = useRef();
  var canbo = useSelector(selectCBData);
  var dispatch = useDispatch();
  var form = useSelector(selectCVDForm);

  useEffect(() => {
    dispatch(getDuLieuTheoUserAsync());
  }, []);

  const handleOnClickButtonDuyet = (e) => {
    e.preventDefault();
    dispatch(duyetCVAsync(form));
  }

  useEffect(() => {
    if (form.isSubmitted)
      MySwal.fire({
        title: <h1>Thao tác thành công</h1>,
        icon: "success",
        footer: "EOffice &copy; 2022",
      }).then(() => {
        dispatch(setIsSubmited(false));
        dispatch(getDetailDataAsync(id));
      });
  }, [form.isSubmitted]);

  return (
    <Form>
      <FormGroup row>
        <Label for="duyet" md={2}>
          Chọn cán bộ xử lý
        </Label>
        <Col md={10}>
          <ReactSelect
            ref={refCBDuyet}
            options={canbo}
            getOptionLabel={(option) =>
              option.ma + " | " + option.holot + " " + option.ten
            }
            getOptionValue={(option) => option._id}
            isClearable
            id="duyet"
            name="duyet"
            placeholder="Chọn cán bộ xử lý..."
            onChange={(e) => {
              if (!e) {
                dispatch(onChangeFormCBXuLy(""));
              } else dispatch(onChangeFormCBXuLy(e._id));
            }}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="ykien" md={2}>
          Ý kiến
        </Label>
        <Col md={10}>
          <Input value={form.ykien} type="textarea" onChange={e=>dispatch(onChangeFormYKien(e.target.value))} />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col md={6}>
          <Button color="danger" className="w-100">
            Không duyệt
          </Button>
        </Col>
        <Col md={6}>
          <Button color="primary" className="w-100" onClick={handleOnClickButtonDuyet}>
            Duyệt
          </Button>
        </Col>
      </FormGroup>
    </Form>
  );
}

export default DuyetCongVanDuyet;
