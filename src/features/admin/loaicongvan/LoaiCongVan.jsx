import { useEffect, useState } from "react";
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
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import DataTable from "react-data-table-component";

import {
  deleteDataAsync,
  getDataAsync,
  resetError,
  setIsEdit,
  selectLCV,
  selectLCVData,
  selectLCVEdit,
  selectLCVErr,
  setForm,
} from "./loaiCongVanSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faPencilSquare,
  faPlus,
  faPlusSquare,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { customStyles, paginationConfig } from "../../../app/datatableConfig";
import LoaiCongVanCreate from "./LoaiCongVanCreate";
import LoaiCongVanEdit from "./LoaiCongVanEdit";

const ActionButton = ({ data, handleEditButtonClick }) => {
  const deletedLCV = useSelector(selectLCV);
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);

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
          `Đã xóa ${deletedLCV.ten} khỏi hệ thống`,
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
      <Button className="btn-neutral mx-1" onClick={handleDeleteButtonClick}>
        <FontAwesomeIcon icon={faTrash} className="text-danger" /> Xóa
      </Button>
    </>
  );
};

function LoaiCongVan() {
  const MySwal = withReactContent(Swal);
  const [modalAdd, setModalAdd] = useState(false);
  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      maxWidth: '100px',
      right: true,
    },
    {
      name: "Tên loại văn bản",
      selector: (row) => row.ten,
      sortable: true,
    },
    {
      name: "Tên viết tắt",
      selector: (row) => row.viettat,
      sortable: true,
    },
    {
      cell: (row) => (
        <ActionButton
          data={row}
          handleEditButtonClick={handleEditButtonClick}
        />
      ),
      center: true,
      maxWidth: "300px",
    },
  ];
  const data = useSelector(selectLCVData);
  const err = useSelector(selectLCVErr);
  const edit = useSelector(selectLCVEdit);
  const dispatch = useDispatch();
  const [filterText, setFilterText] = useState("");
  const filterItem = data.filter(
    (item) =>
      item.ten.toLowerCase().includes(filterText.toLowerCase()) ||
      item.viettat.toLowerCase().includes(filterText.toLowerCase())
  );

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
        dispatch(resetError());
      });
  }, [err]);

  const handleClear = () => {
    if (filterText) {
      setFilterText("");
    }
  };

  const handleAddButtonClick = () => {
    setModalAdd(!modalAdd);
  };

  const handleEditButtonClick = (data) => {
    dispatch(setIsEdit(!edit));
    dispatch(setForm(data));
  };

  return (
    <Container fluid className="my-3 px-5">
      <Row className="mb-3">
        <Col md={12} className="mb-2">
          <h2>Loại công văn</h2>
        </Col>
        <Col md={6}>
          <InputGroup>
            <Input
              placeholder="Tìm kiếm ..."
              className="input-custom"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
            <InputGroupText onClick={handleClear}>
              <FontAwesomeIcon icon={faXmark} />
            </InputGroupText>
          </InputGroup>
        </Col>
        <Col md={6} className="text-end">
          <Button className="btn-neutral" onClick={handleAddButtonClick}>
            <FontAwesomeIcon icon={faPlus} /> Thêm mới
          </Button>
        </Col>
      </Row>
      <Row>
        {!err && (
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
        )}
      </Row>
      <Modal isOpen={modalAdd} size="xl">
        <ModalHeader toggle={() => setModalAdd(!modalAdd)}>
          <FontAwesomeIcon icon={faPlusSquare} className="mx-2" />
          Thêm loại công văn mới
        </ModalHeader>
        <ModalBody>
          <LoaiCongVanCreate />
        </ModalBody>
      </Modal>
      <Modal isOpen={edit} size="xl">
        <ModalHeader toggle={() => dispatch(setIsEdit(!edit))}>
          <FontAwesomeIcon icon={faPencilSquare} className="mx-2" />
          Chỉnh sửa loại công văn
        </ModalHeader>
        <ModalBody>
          <LoaiCongVanEdit />
        </ModalBody>
      </Modal>
    </Container>
  );
}

export default LoaiCongVan;
