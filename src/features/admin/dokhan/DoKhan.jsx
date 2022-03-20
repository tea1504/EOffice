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
} from "reactstrap";
import { customStyles, paginationConfig } from "../../../app/datatableConfig";
import {
  deleteDataAsync,
  getDataAsync,
  selectDKAdd,
  selectDKData,
  selectDKEdit,
  setAdd,
  setEdit,
  setForm,
} from "./doKhanSlice";
import DoKhanCreate from "./DoKhanCreate";
import DoKhanEdit from "./DoKhanEdit";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

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
        MySwal.fire(
          "Đã xóa!",
          `Đã xóa ${data.ten} khỏi hệ thống`,
          "success"
        );
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

function DoKhan() {
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
  const data = useSelector(selectDKData);
  const dispatch = useDispatch();
  const [filterText, setFilterText] = useState("");
  const filterItem = data.filter((item) =>
    item.ten.toLowerCase().includes(filterText.toLowerCase())
  );
  const add = useSelector(selectDKAdd);
  const edit = useSelector(selectDKEdit);

  useEffect(() => {
    dispatch(getDataAsync());
  }, []);

  return (
    <Container fluid className="my-3 px-5">
      <Row className="mb-3">
        <Col md={12} className="mb-2">
          <h2>Độ khẩn</h2>
        </Col>
        <Col md={6}>
          <InputGroup>
            <Input
              className="input-custom"
              placeholder="Tìm kiếm ..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
            <InputGroupText onClick={() => setFilterText("")}>
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
          Thêm độ khẩn
        </ModalHeader>
        <ModalBody>
          <DoKhanCreate />
        </ModalBody>
      </Modal>
      <Modal isOpen={edit} size="xl">
        <ModalHeader toggle={() => dispatch(setEdit(!edit))}>
          <FontAwesomeIcon icon={faPencilSquare} className="mx-2" />
          Chỉnh sửa độ khẩn
        </ModalHeader>
        <ModalBody>
          <DoKhanEdit />
        </ModalBody>
      </Modal>
    </Container>
  );
}

export default DoKhan;
