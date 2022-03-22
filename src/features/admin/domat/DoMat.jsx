import {
  faEdit,
  faPencilSquare,
  faPlus,
  faPlusSquare,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  InputGroup,
  Input,
  InputGroupText,
  Button,
  Card,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { customStyles, paginationConfig } from "../../../app/datatableConfig";
import DoKhanCreate from "./DoMatCreate";
import DoMatEdit from "./DoMatEdit";
import {
  deleteDataAsync,
  getDataAsync,
  resetErr,
  selectDMAdd,
  selectDMData,
  selectDMEdit,
  selectDMErr,
  setAdd,
  setEdit,
  setForm,
} from "./doMatSlice";

const ActionButton = ({ data }) => {
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();

  const handleEditButtonClick = (data) => {
    dispatch(setEdit(true));
    dispatch(setForm(data));
  };

  const handleDeleteButtonClick = () => {
    MySwal.fire({
      title: "Bạn có chắc chắn?",
      text: "Dữ liệu sẽ không thể phục hồi lại sau khi xóa.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Vâng, vẫn xóa!",
      cancelButtonText: "Không, hủy xóa!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteDataAsync(data._id));
        dispatch(getDataAsync());
        MySwal.fire("Đã xóa!", `Đã xóa ${data.ten} khỏi hệ thống`, "success");
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        MySwal.fire("Đã hủy", "Đã hủy thao tác xóa");
      }
    });
  };

  return (
    <>
      <Button
        className="btn-neutral mx-1"
        onClick={() => handleEditButtonClick(data)}
      >
        <FontAwesomeIcon icon={faEdit} /> Chỉnh sửa
      </Button>
      <Button
        className="btn-neutral mx-1"
        onClick={() => handleDeleteButtonClick(data)}
      >
        <FontAwesomeIcon icon={faTrash} className="text-danger" /> Xóa
      </Button>
    </>
  );
};

function DoMat() {
  const MySwal = withReactContent(Swal);
  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      maxWidth: "100px",
      right: true,
    },
    {
      name: "Độ khẩn",
      selector: (row) => row.ten,
      sortable: true,
    },
    {
      cell: (row) => <ActionButton data={row} />,
      center: true,
      maxWidth: "300px",
    },
  ];
  const data = useSelector(selectDMData);
  const err = useSelector(selectDMErr);
  const dispatch = useDispatch();
  const [filterText, setFilterText] = useState("");
  const filterItem = data.filter((item) =>
    item.ten.toLowerCase().includes(filterText.toLowerCase())
  );
  const edit = useSelector(selectDMEdit);
  const add = useSelector(selectDMAdd);

  useEffect(() => {
    dispatch(getDataAsync());
  }, []);

  useEffect(() => {
    if (err)
      MySwal.fire({
        title: <h1>Error {err.status}</h1>,
        text: err.data,
        icon: "error",
        footer: "EOffice &copy; 2022",
      }).then(() => {
        dispatch(resetErr());
      });
  }, [err]);

  return (
    <Container fluid className="my-3 px-5">
      <Row className="mb-3">
        <Col md={12} className="mb-2">
          <h2>Độ mật</h2>
        </Col>
        <Col md={6}>
          <InputGroup>
            <Input
              type="text"
              className="input-custom"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
            <InputGroupText onClick={() => setFilterText("")}>
              <FontAwesomeIcon icon={faXmark} />
            </InputGroupText>
          </InputGroup>
        </Col>
        <Col md={6} className="text-end">
          <Button className="btn-neutral" onClick={() => dispatch(setAdd(true))}>
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
              customStyles={customStyles}
              columns={columns}
              data={filterItem}
            />
          </Card>
        </Col>
      </Row>
      <Modal isOpen={add} size="xl">
        <ModalHeader toggle={() => dispatch(setAdd(!add))}>
          <FontAwesomeIcon icon={faPlusSquare} className="mx-2" />
          Thêm độ mật
        </ModalHeader>
        <ModalBody>
          <DoKhanCreate />
        </ModalBody>
      </Modal>
      <Modal isOpen={edit} size="xl">
        <ModalHeader toggle={() => dispatch(setEdit(!edit))}>
          <FontAwesomeIcon icon={faPencilSquare} className="mx-2" />
          Chỉnh sửa độ mật
        </ModalHeader>
        <ModalBody>
          <DoMatEdit />
        </ModalBody>
      </Modal>
    </Container>
  );
}

export default DoMat;
