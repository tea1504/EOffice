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
  Table,
} from "reactstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { customStyles, paginationConfig } from "../../../app/datatableConfig";
import DonViCreate from "./DonViCreate";
import DonViEdit from "./DonViEdit";
import {
  deleteDataAsync,
  getDataAsync,
  resetErr,
  selectDVAdd,
  selectDVData,
  selectDVEdit,
  selectDVErr,
  setAdd,
  setEdit,
  setForm,
} from "./donViSlice";

const ActionButton = ({ data }) => {
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();

  const handleEditButtonClick = () => {
    dispatch(setForm(data));
    dispatch(setEdit(true));
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
      <Button className="btn-neutral mx-1" onClick={handleEditButtonClick}>
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

const ExpandedComponent = ({ data }) => {
  return (
    <div className="px-5 bg-secondary bg-gradient py-3">
      <h5 className="text-white">Đơn vị bên ngoài của {data.ten}</h5>
      <Table className="text-white">
        <thead>
          <tr>
            <th>#</th>
            <th>Tên đơn vị</th>
            <th>Email đơn vị</th>
          </tr>
        </thead>
        <tbody>
          {data.listbenngoai.list.map((element, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{element.ten}</td>
                <td>{element.email}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

function DonVi() {
  const MySwal = withReactContent(Swal);
  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      maxWidth: "100px",
      right: true,
    },
    {
      name: "Tên đơn vị",
      selector: (row) => row.ten,
      sortable: true,
    },
    {
      name: "Email đơn vị",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      cell: (row) => <ActionButton data={row} />,
      center: true,
      maxWidth: "300px",
    },
  ];
  const data = useSelector(selectDVData);
  const dispatch = useDispatch();
  const err = useSelector(selectDVErr);
  const [filterText, setFilterText] = useState("");
  const filterItem = data.filter(
    (item) =>
      item.ten.toLowerCase().includes(filterText.toLowerCase()) ||
      item.email.toLowerCase().includes(filterText.toLowerCase())
  );
  const edit = useSelector(selectDVEdit);
  const add = useSelector(selectDVAdd);

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
          <h2>Đơn vị</h2>
        </Col>
        <Col md={6}>
          <InputGroup>
            <Input
              type="text"
              placeholder="Tìm kiếm ..."
              className="input-custom"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
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
              expandableRows
              expandableRowsComponent={ExpandedComponent}
              customStyles={customStyles}
              columns={columns}
              data={filterItem}
              expandableRowDisabled={(row) =>
                row.listbenngoai.list.length === 0
              }
            />
          </Card>
        </Col>
      </Row>
      <Modal size="xl" isOpen={add}>
        <ModalHeader toggle={() => dispatch(setAdd(!add))}>
          <FontAwesomeIcon icon={faPlusSquare} className="mx-2" />
          Thêm đơn vị
        </ModalHeader>
        <ModalBody>
          <DonViCreate />
        </ModalBody>
      </Modal>
      <Modal size="xl" isOpen={edit}>
        <ModalHeader toggle={() => dispatch(setEdit(!edit))}>
          <FontAwesomeIcon icon={faPencilSquare} className="mx-2" />
          Chỉnh sửa đơn vị
        </ModalHeader>
        <ModalBody>
          <DonViEdit />
        </ModalBody>
      </Modal>
    </Container>
  );
}

export default DonVi;
