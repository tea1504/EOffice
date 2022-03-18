import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Tooltip } from "reactstrap";

export const LoaiCongVanRow = ({id = "1", ten = "1", viettat = "1"}) => {
  const [tooltipEdit, setTooltipEdit] = useState(false);
  const [tooltipDelete, setTooltipDelete] = useState(false);

  return (
    <tr className="align-middle">
      <td>{ten}</td>
      <td>{viettat}</td>
      <td>
        <Button className="btn-neutral" id="btnEdit">
          <FontAwesomeIcon icon={faEdit} />
        </Button>
        <Tooltip
          flip
          target="btnEdit"
          toggle={() => {
            setTooltipEdit(!tooltipEdit);
          }}
          isOpen={tooltipEdit}
        >
          Chỉnh sửa
        </Tooltip>
        {" "}
        <Button className="btn-neutral" id="btnDelete">
          <FontAwesomeIcon icon={faTrash} className="text-danger"/>
        </Button>
        <Tooltip
          flip
          target="btnDelete"
          toggle={() => {
            setTooltipDelete(!tooltipDelete);
          }}
          isOpen={tooltipDelete}
        >
          Xóa
        </Tooltip>
      </td>
    </tr>
  );
};
