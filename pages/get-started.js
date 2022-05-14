import { Form, Input, Select } from "antd";
import React, { useContext, useState } from "react";
import Layout from "@/components/Layout";
import styles from "@/styles/Login.module.css";
import Button from "@/components/Button";
import { AuthContext } from "@/context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { parseCookies } from "../helpers";
import Loader from "@/components/Loader";

function Index({ token }) {
  const [loading, setLoading] = useState(false);
  const { completeProfile } = useContext(AuthContext);

  const onFinish = async (values) => {
    if (token) {
      setLoading(true);

      const res = await completeProfile(token, values);
      if (!res.success) {
        toast.error(res.message);
      }
      setLoading(false);
    } else {
      toast("token error");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const completeProfileForm = () => (
    <div>
      <h2>Complete Profile</h2>
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
          label="First Name"
          name="first_name"
          rules={[{ required: true, message: "Please input your first name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="last_name"
          rules={[{ required: true, message: "Please input your last name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone_number"
          rules={[
            { required: true, message: "Please input your phone number" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item style={{ float: "right" }}>
          {loading ? (
            <Loader />
          ) : (
            <Button
              // onClick={onFinish}
              text="Compelete Profile"
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
      childern={<div className={styles.container}>{completeProfileForm()}</div>}
    />
  );
}

export default Index;

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  return {
    props: {
      token,
    },
  };
}
