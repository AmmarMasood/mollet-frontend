import { Form, Input } from "antd";
import React, { useContext, useState } from "react";
import Layout from "@/components/Layout";
import styles from "@/styles/Login.module.css";
import Button from "@/components/Button";
import { AuthContext } from "@/context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "@/components/Loader";

function Index() {
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const onFinish = async (values) => {
    setLoading(true);
    const { email, password } = values;
    const res = await login({ email, password });
    if (!res.success) {
      toast.error(res.message);
    }
    setLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };

  return (
    <Layout
      childern={
        <div className={styles.container}>
          <div>
            <h2>Login</h2>
            <ToastContainer />
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  {
                    type: "email",
                    message: "Please enter correct email address",
                  },
                ]}
              >
                <Input type="email" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                  {
                    min: 8,
                    message: "Password must be contain 8 letters or more",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item style={{ float: "right" }}>
                {loading ? (
                  <Loader />
                ) : (
                  <Button
                    // onClick={onFinish}
                    text="Login"
                    style={{
                      backgroundColor: "var(--primary-color)",
                      padding: "10px 20px",
                      fontSize: "16px",
                    }}
                  />
                )}
              </Form.Item>
            </Form>
          </div>
        </div>
      }
    />
  );
}

export default Index;
