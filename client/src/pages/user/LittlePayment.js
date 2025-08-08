import React from "react";
import { Button, Col, Row, Statistic, Space } from "antd";
import { useNavigate } from "react-router-dom";

const LittlePayment = () => {
  const navigate = useNavigate();
  const handleRecharge = () => {
    navigate("/Payment");
  };
  return (
    <Row>
      <Space direction="horizontal" size={500}>
        <Statistic
          style={{ fontsize: 100 }}
          title="Account Balance (US Dollar)"
          value={1123}
          precision={2}
        />
        <Button
          style={{ marginTop: 16 }}
          type="primary"
          onClick={handleRecharge}
        >
          Recharge
        </Button>
      </Space>
      <hr />
    </Row>
  );
};

export default LittlePayment;
