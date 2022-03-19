import {
  faEdit,
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
import { getDataAsync, selectDKAdd, selectDKData, setAdd } from "./doKhanSlice";

const ActionButton = () => {
  return (
    <>
      <Button className="btn-neutral mx-1">
        <FontAwesomeIcon icon={faEdit} /> Chỉnh sửa
      </Button>
      <Button className="btn-neutral mx-1">
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
      cell: () => <ActionButton />,
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
        <ModalBody></ModalBody>
      </Modal>
    </Container>
  );
}

export default DoKhan;
