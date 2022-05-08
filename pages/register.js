import { Form, Input, Select } from "antd";
import React, { useContext, useState } from "react";
import Layout from "@/components/Layout";
import styles from "@/styles/Login.module.css";
import Button from "@/components/Button";
import { AuthContext } from "@/context/AuthContext";
import Loader from "@/components/Loader";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

function Index() {
  const [loading, setLoading] = useState(false);
  const { register } = useContext(AuthContext);

  const onFinish = async (values) => {
    setLoading(true);
    const { email, password } = values;
    const res = await register({ email, password });
    console.log("bam,", res);
    if (!res.success) {
      toast.error(res.message);
    }
    setLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const showSignUpForm = () => (
    <div>
      <h2>Sign Up</h2>
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
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 19 }}>
          {loading ? (
            <Loader style={{ marginLeft: "60px" }} />
          ) : (
            <Button
              // onClick={onFinish}
              text="Register"
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
  );

  return (
    <Layout
      childern={<div className={styles.container}>{showSignUpForm()}</div>}
    />
  );
}

export default Index;
