import {
  faEdit,
  faEye,
  faPlus,
  faTrash,
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
import { selectUserVanThu } from "../user/userSlice";
import conditionalRowStyles from "./conditionalRowStyles";
import { getDataAsync, selectCVDData } from "./congVanDenSlice";

const ActionButton = ({ data }) => {
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const [tooltipXem, setTooltipXem] = useState(false);
  const [tooltipEdit, setTooltipEdit] = useState(false);
  const [tooltipDel, setTooltipDel] = useState(false);

  const handleXemButtonClick = () => {};

  const handleEditButtonClick = () => {};

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
        // dispatch(deleteDataAsync(data._id));
        // dispatch(getDataAsync());
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
      <Button
        className="btn-neutral mx-1"
        id="btnEdit"
        onClick={handleEditButtonClick}
      >
        <FontAwesomeIcon icon={faEdit} />
      </Button>
      <Tooltip
        target="btnEdit"
        isOpen={tooltipEdit}
        toggle={() => setTooltipEdit(!tooltipEdit)}
      >
        Chỉnh sửa
      </Tooltip>
      <Button
        className="btn-neutral mx-1"
        id="btnDel"
        onClick={() => handleDeleteButtonClick(data)}
      >
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

function CongVanDen() {
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
    },
    {
      name: "Đơn vị phát hành",
      selector: (row) => row.dv_phathanh?.ten,
      sortable: true,
    },
    {
      name: "Độ mật",
      selector: (row) => row.domat?.ten,
      sortable: true,
    },
    {
      name: "Độ khẩn",
      selector: (row) => row.dokhan?.ten,
      sortable: true,
    },
    {
      name: "Trạng thái",
      selector: (row) => row.trangthai.ten,
      sortable: true,
    },
    {
      name: "Ngày đến",
      selector: (row) => {
        var options = { day: "2-digit", month: "2-digit", year: "numeric" };
        var d = new Date(row.ngayden);
        return d.toLocaleDateString("vi-VN", options);
      },
      sortable: true,
    },
    {
      name: "Trích yếu",
      selector: (row) => row.trichyeu,
      sortable: true,
    },
    {
      cell: (row) => <ActionButton data={row} />,
      center: true,
      maxWidth: "300px",
    },
  ];
  const vanThu = useSelector(selectUserVanThu);
  const data = useSelector(selectCVDData);
  const dispatch = useDispatch();
  const [filterText, setFilterText] = useState("");
  const navigate = useNavigate();
  const filterItem = data.filter((item) => item);
  const handleClear = () => {};
  const handleAddButtonClick = () => {
    navigate("./them");
  };

  useEffect(() => {
    dispatch(getDataAsync());
  }, []);

  return (
    <Container fluid className="my-3 px-5">
      <Row className="mb-3">
        <Col md={12} className="mb-2">
          <h2>Công văn đến</h2>
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
          {vanThu && (
            <Button className="btn-neutral" onClick={handleAddButtonClick}>
              <FontAwesomeIcon icon={faPlus} /> Thêm mới
            </Button>
          )}
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
    </Container>
  );
}

export default CongVanDen;
