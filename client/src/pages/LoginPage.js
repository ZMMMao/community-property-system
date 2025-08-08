import React from "react";
import { Form, Button, Input, Space, Checkbox, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
class LoginPage extends React.Component {
  formRef = React.createRef();
  state = {
    asHost: false,
    loading: false,
  };
  handleLogin = () => {
    const asHost = this.state.asHost;
    this.props.handleLoginSuccess(asHost);
    //   alert("Login successful!");
  };
  handleCheckboxOnChange = (e) => {
    this.setState({
      asHost: e.target.checked,
    });
  };
  render() {
    return (
      <div style={{ width: 500, margin: "20px auto" }}>
        <Form ref={this.formRef}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              disabled={this.state.loading}
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              disabled={this.state.loading}
              placeholder="Password"
            />
          </Form.Item>
        </Form>
        <Space>
          <Checkbox
            disabled={this.state.loading}
            checked={this.state.asHost}
            onChange={this.handleCheckboxOnChange}
          >
            As Host
          </Checkbox>
          <Button
            onClick={this.handleLogin}
            disabled={this.state.loading}
            shape="round"
            type="primary"
            style={{ backgroundColor: "#16a085", borderColor: "#f0ad4e" }}
          >
            Log in
          </Button>
          <Button
            //            onClick={this.handleRegister}
            disabled={this.state.loading}
            shape="round"
            type="primary"
            style={{ backgroundColor: "#16a085", borderColor: "#f0ad4e" }}
          >
            Register
          </Button>
        </Space>
      </div>
    );
  }
}
export default LoginPage;
