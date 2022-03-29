import {
  faCheckSquare,
  faEdit,
  faEye,
  faInfo,
  faPencilSquare,
  faPlus,
  faPlusSquare,
  faSquare,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupText,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Tooltip,
} from "reactstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { customStyles, paginationConfig } from "../../../app/datatableConfig";
import CanBoCreate from "./CanBoCreate";
import CanBoDetail from "./CanBoDetail";
import {
  getDataAsync,
  selectCBAdd,
  selectCBData,
  selectCBDetail,
  selectCBEdit,
  selectCBErr,
  setAdd,
  setDetail,
  setForm,
} from "./canBoSlice";
import { selectDVData, getDataAsync as getDonVi } from '../donvi/donViSlice'

const ActionButton = ({ data }) => {
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const [tooltipXem, setTooltipXem] = useState(false);
  const [tooltipEdit, setTooltipEdit] = useState(false);
  const [tooltipDel, setTooltipDel] = useState(false);

  const handleXemButtonClick = () => {
    dispatch(setForm(data));
    dispatch(setDetail(true));
  };

  return (
    <>
      <Button
        className="btn-neutral mx-1"
        id="btnXem"
        onClick={handleXemButtonClick}
      >
        <FontAwesomeIcon icon={faEye} />
      </Button>
      <Tooltip
        target="btnXem"
        isOpen={tooltipXem}
        toggle={() => setTooltipXem(!tooltipXem)}
      >
        Xem chi tiết
      </Tooltip>
      <Button className="btn-neutral mx-1" id="btnEdit">
        <FontAwesomeIcon icon={faEdit} />
      </Button>
      <Tooltip
        target="btnEdit"
        isOpen={tooltipEdit}
        toggle={() => setTooltipEdit(!tooltipEdit)}
      >
        Chỉnh sửa
      </Tooltip>
      <Button className="btn-neutral mx-1" id="btnDel">
        <FontAwesomeIcon icon={faTrash} className="text-danger" />
      </Button>
      <Tooltip
        target="btnDel"
        isOpen={tooltipDel}
        toggle={() => setTooltipDel(!tooltipDel)}
      >
        Xóa
      </Tooltip>
    </>
  );
};

function CanBo() {
  const MySwal = withReactContent(Swal);
  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      maxWidth: "100px",
      right: true,
    },
    {
      name: "Mã cán bộ",
      selector: (row) => row.ma,
      maxWidth: "150px",
      sortable: true,
    },
    {
      name: "Họ lót",
      selector: (row) => row.holot,
      sortable: true,
    },
    {
      name: "Tên",
      selector: (row) => row.ten,
      sortable: true,
    },
    {
      name: "Đơn vị",
      selector: (row) => row.donvi.ten,
      sortable: true,
    },
    {
      name: "Trạng thái",
      selector: (row) => {
        if (row.actived)
          return (
            <span className="badge rounded-pill bg-primary">hoạt động</span>
          );
        else
          return (
            <span className="badge rounded-pill bg-secondary">bị khóa</span>
          );
      },
      center: true,
    },
    {
      cell: (row) => <ActionButton data={row} />,
      center: true,
      maxWidth: "300px",
    },
  ];
  const data = useSelector(selectCBData);
  const err = useSelector(selectCBErr);
  const dispatch = useDispatch();
  const [filterText, setFilterText] = useState("");
  const filterItem = data.filter((item) =>
    item.ten.toLowerCase().includes(filterText.toLowerCase())
  );
  const edit = useSelector(selectCBEdit);
  const add = useSelector(selectCBAdd);
  const detail = useSelector(selectCBDetail);
  const conditionalRowStyles = [
    {
      when: (row) => !row.actived,
      style: {
        backgroundColor: "#ccc",
        color: "#fff",
      },
    },
  ];
  const donVi = useSelector(selectDVData);

  useEffect(() => {
    dispatch(getDataAsync());
    dispatch(getDonVi());
  }, []);

  return (
    <Container fluid className="my-3 px-5">
      <Row className="mb-3">
        <Col md={12} className="mb-2">
          <h2>Cán bộ</h2>
        </Col>
        <Col md={6}>
          <InputGroup>
            <Input placeholder="Tìm kiếm ..." className="input-custom" />
            <InputGroupText>
              <FontAwesomeIcon icon={faXmark} />
            </InputGroupText>
          </InputGroup>
        </Col>
        <Col md={6} className="text-end">
          <Button
            className="btn-neutral"
            onClick={() => dispatch(setAdd(true))}
          >
            <FontAwesomeIcon icon={faPlus} /> Thêm mới
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Card>
            <DataTable
              pagination
              paginationComponentOptions={paginationConfig}
              fixedHeader
              fixedHeaderScrollHeight="65vh"
              highlightOnHover
              conditionalRowStyles={conditionalRowStyles}
              customStyles={customStyles}
              columns={columns}
              data={filterItem}
            />
          </Card>
        </Col>
      </Row>
      <Modal isOpen={detail} size="xl">
        <ModalHeader toggle={() => dispatch(setDetail(false))}>
          <FontAwesomeIcon icon={faInfo} className="mx-2" />
          Thông tin cán bộ
        </ModalHeader>
        <ModalBody>
          <CanBoDetail />
        </ModalBody>
      </Modal>
      <Modal isOpen={add} size="xl">
        <ModalHeader toggle={() => dispatch(setAdd(false))}>
          <FontAwesomeIcon icon={faPlusSquare} className="mx-2" />
          Thêm cán bộ
        </ModalHeader>
        <ModalBody>
          <CanBoCreate donVi={donVi}/>
        </ModalBody>
      </Modal>
      <Modal isOpen={false} size="xl">
        <ModalHeader toggle={() => false}>
          <FontAwesomeIcon icon={faPencilSquare} className="mx-2" />
          Chỉnh sửa cán bộ
        </ModalHeader>
        <ModalBody></ModalBody>
      </Modal>
    </Container>
  );
}

export default CanBo;
