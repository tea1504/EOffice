import {
  faEye,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupText,
  Row,
  Tooltip,
} from "reactstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { customStyles, paginationConfig } from "../../app/datatableConfig";
import {
  getDuLieuChuaDuyetAsync,
  resetForm,
  selectCVDData,
} from "../congvanden/congVanDenSlice";

const ActionButton = ({ data }) => {
  const [tooltipXem, setTooltipXem] = useState(false);
  const navigate = useNavigate();

  const handleXemButtonClick = () => {
    navigate("/congvanden/cong-van-den-so-" + data.so.replace("/", "-") + "." + data._id + "?r=duyetcongvan");
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
    </>
  );
};

function DuyetCongVan() {
  const MySwal = withReactContent(Swal);
  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      maxWidth: "100px",
      right: true,
    },
    {
      name: "Số công văn",
      selector: (row) => row.so,
      sortable: true,
      maxWidth: "150px",
    },
    {
      name: "Đơn vị phát hành",
      selector: (row) => row.dv_phathanh?.ten,
      sortable: true,
      maxWidth: "500px",
    },
    {
      name: "Trạng thái",
      selector: (row) => row.trangthai.ten,
      sortable: true,
      maxWidth: "150px",
    },
    {
      name: "Ngày đến",
      selector: (row) => {
        var options = { day: "2-digit", month: "2-digit", year: "numeric" };
        var d = new Date(row.ngayden);
        return d.toLocaleDateString("vi-VN", options);
      },
      sortable: true,
      maxWidth: "150px",
    },
    {
      name: "Trích yếu",
      selector: (row) => row.trichyeu,
      sortable: true,
      maxWidth: "500px",
    },
    {
      cell: (row) => <ActionButton data={row} />,
      center: true,
      maxWidth: "300px",
    },
  ];
  const data = useSelector(selectCVDData);
  const dispatch = useDispatch();
  const [filterText, setFilterText] = useState("");
  const filterItem = data.filter(
    (item) =>
      item.so.toLowerCase().includes(filterText.toLowerCase()) ||
      item.dv_phathanh.ten.toLowerCase().includes(filterText.toLowerCase()) ||
      item.trangthai.ten.toLowerCase().includes(filterText.toLowerCase()) ||
      item.trichyeu.toLowerCase().includes(filterText.toLowerCase())
  );
  const handleClear = () => {
    setFilterText("");
  };

  useEffect(() => {
    dispatch(resetForm());
    dispatch(getDuLieuChuaDuyetAsync());
  }, []);

  return (
    <Container fluid className="my-3 px-5">
      <Row className="mb-3">
        <Col md={12} className="mb-2">
          <h2>Công văn cần duyệt</h2>
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
      </Row>
      <Row>
        <Col md={12}>
          <Card className="shadow">
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
    </Container>
  );
}

export default DuyetCongVan;
