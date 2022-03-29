import { useSelector } from "react-redux";
import { Table } from "reactstrap";
import { selectCBForm } from "./canBoSlice";

function CanBoDetail() {
  const detail = useSelector(selectCBForm);

  return (
    <Table>
      <tbody>
        <tr>
          <th width="200px">Mã cán bộ</th>
          <td>{detail.ma}</td>
        </tr>
        <tr>
          <th>Họ và tên</th>
          <td>
            {detail.holot} {detail.ten}
          </td>
        </tr>
        <tr>
          <th>Địa chỉ email</th>
          <td>
            <a href={"mailto:" + detail.email}>{detail.email}</a>
          </td>
        </tr>
        <tr>
          <th>Số điện thoại</th>
          <td>{detail.sdt}</td>
        </tr>
        <tr>
          <th>Đơn vị</th>
          <td>{detail.tendonvi}</td>
        </tr>
        <tr>
          <th>Quyền</th>
          <td>
            {detail.laadmin ? (
              <span className="badge rounded-pill bg-primary">Admin</span>
            ) : (
              <span></span>
            )}
            {detail.lavanthu ? (
              <span className="badge rounded-pill bg-danger">Văn thư</span>
            ) : (
              <span></span>
            )}
            {detail.lalanhdao ? (
              <span className="badge rounded-pill bg-success">Lãnh đạo</span>
            ) : (
              <span></span>
            )}
          </td>
        </tr>
        <tr>
          <th>Trạng thái</th>
          <td>{detail.actived?(
              <span className="badge rounded-pill bg-primary">Hoạt động</span>
            ) : (
              <span className="badge rounded-pill bg-secondary">Bị khóa</span>
            )}</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default CanBoDetail;
