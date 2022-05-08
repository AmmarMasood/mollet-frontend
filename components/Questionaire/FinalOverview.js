import React, { useState, useEffect, useContext } from "react";
import styles from "@/styles/FinalOverview.module.css";
import Button from "../Button";
import { Form, InputNumber } from "antd";
import { AuthContext } from "@/context/AuthContext";
import Loader from "../Loader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FinalOverview({ finalScore, goBackward, token }) {
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [portFolioType, setPortFolioType] = useState({ name: "", type: "" });
  const { completeProfile } = useContext(AuthContext);

  useEffect(() => {
    const s = finalScore.reduce((partialSum, a) => partialSum + a, 0);
    let temp = { name: "", type: "" };
    if (s <= 18) {
      temp = { name: "Low risk tolerance", type: "LOW_RISK" };
    } else if (s >= 19 && s <= 22) {
      temp = {
        name: "Below Average risk tolerance",
        type: "BELOW_AVERAGE_RISK",
      };
    } else if (s >= 23 && s <= 28) {
      temp = { name: "Average risk tolerance", type: "AVERAGE_RISK" };
    } else if (s >= 29 && s <= 32) {
      temp = { name: "Above average tolerance", type: "ABOVE_AVERAGE_RISK" };
    } else if (s >= 33) {
      temp = { name: "High risk tolerance", type: "HIGH_RISK" };
    }
    setPortFolioType(temp);
    setTotal(s);
  }, [finalScore]);

  const onFinish = async (values) => {
    if (token && values.invested_amount && portFolioType.type) {
      setLoading(true);

      const res = await completeProfile(token, {
        ...values,
        portfolio_type: portFolioType.type,
        risk_score: total,
      });
      if (!res.success) {
        toast.error(res.message);
      }
      setLoading(false);
    }
  };
  const onFinishFailed = () => {};
  return (
    <div className={styles.container}>
      <ToastContainer />
      <h3>
        Risk Score: <span>{total}</span>
      </h3>

      <h2>Your score falls in {portFolioType.name} portfolio</h2>

      <div className={styles.enterInvestmentContainer}>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Enter Investment Value"
            name="invested_amount"
            rules={[
              {
                required: true,
                message: "Please input the value you want to invest",
              },
            ]}
          >
            <InputNumber style={{ minWidth: "300px" }} addonBefore="Rs" />
          </Form.Item>

          <Form.Item>
            {loading ? (
              <Loader />
            ) : (
              <Button
                onClick={onFinish}
                text="Create Portfolio"
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
  );
}

export default FinalOverview;
