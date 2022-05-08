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
import conditionalRowStyles from "../congvan/conditionalRowStyles";
import { selectUserLanhDao, selectUserVanThu } from "../user/userSlice";
import {
  deleteDataAsync,
  getDataAsync,
  resetForm,
  selectCVDiData,
} from "./congVanDiSlice";

const ActionButton = ({ data }) => {
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const [tooltipXem, setTooltipXem] = useState(false);
  const [tooltipEdit, setTooltipEdit] = useState(false);
  const [tooltipDel, setTooltipDel] = useState(false);
  const navigate = useNavigate();
  const laVanThu = useSelector(selectUserVanThu);
  const laLanhDao = useSelector(selectUserLanhDao);

  const handleXemButtonClick = () => {
    navigate(
      "./cong-van-den-so-" + data.so.replace("/", "-") + "." + data._id
    );
  };

  const handleEditButtonClick = () => {
    navigate("./sua/cong-van-den-so-" + data.so.replace("/", "-") + "." + data._id);
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
          `Đã xóa công văn số ${data.so} khỏi hệ thống`,
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
      {(laVanThu || laLanhDao) && (
        <>
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
      )}
    </>
  );
};

function CongVanDi() {
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
      name: "Đơn vị nhận",
      selector: (row) => {
        return (
          <div className="float-left w-100">
            {row.dv_nhan.map((el) => (
              <div key={el._id}>{el.ten}</div>
            ))}
          </div>
        );
      },
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
      name: "Ngày đi",
      selector: (row) => {
        var options = { day: "2-digit", month: "2-digit", year: "numeric" };
        var d = new Date(row.ngaydi);
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
  const vanThu = useSelector(selectUserVanThu);
  const data = useSelector(selectCVDiData);
  const dispatch = useDispatch();
  const [filterText, setFilterText] = useState("");
  const navigate = useNavigate();
  const filterItem = data.filter(
    (item) =>
      item.so.toLowerCase().includes(filterText.toLowerCase()) ||
      item.dv_nhan.ten.toLowerCase().includes(filterText.toLowerCase()) ||
      item.trangthai.ten.toLowerCase().includes(filterText.toLowerCase()) ||
      item.trichyeu.toLowerCase().includes(filterText.toLowerCase())
  );
  const handleClear = () => {
    setFilterText("");
  };
  const handleAddButtonClick = () => {
    navigate("./them");
  };

  useEffect(() => {
    dispatch(resetForm());
    dispatch(getDataAsync());
  }, []);

  return (
    <Container fluid className="my-3 px-5">
      <Row className="mb-3">
        <Col md={12} className="mb-2">
          <h2>Công văn đi</h2>
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
          <Card className="shadow">
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

export default CongVanDi;
