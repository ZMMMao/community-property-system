import React from "react";
import { Row } from "antd";
function Popup({ handleDeleteTrue, handleDeleteFalse }) {
  return (
    <div>
      <div>
        <p style={{ fontSize: "20px" }}>You sure you wanna delete?</p>
        <Row style={{ display: "flex", justifyContent: "space-between" }}>
          <button onClick={handleDeleteFalse} className="modal_buttonCancel">
            Cancel
          </button>
          <button onClick={handleDeleteTrue} className="modal_buttoDelete">
            Confirm
          </button>
        </Row>
      </div>
    </div>
  );
}

export default Popup;
