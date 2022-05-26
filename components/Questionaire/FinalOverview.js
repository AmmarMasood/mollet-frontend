import React, { useState, useEffect, useContext } from "react";
import styles from "@/styles/FinalOverview.module.css";
import Button from "../Button";
import { Form, InputNumber } from "antd";
import { AuthContext } from "@/context/AuthContext";
import Loader from "../Loader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createPortfolio } from "@/apis/Portfolio/portfolio";

function FinalOverview({ finalScore, goBackward, token }) {
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [portFolioType, setPortFolioType] = useState({ name: "", type: "" });
  const { completeProfile } = useContext(AuthContext);
  //
  useEffect(() => {
    const s = finalScore.reduce((partialSum, a) => partialSum + a, 0);
    let temp = { name: "", type: "" };
    if (s <= 18) {
      temp = { name: "Aggresive", type: "AGGRESIVE" };
    } else if (s >= 19 && s <= 22) {
      temp = {
        name: "Semi Aggresive",
        type: "SEMI_AGGRESIVE",
      };
    } else if (s >= 23 && s <= 28) {
      temp = { name: "Moderate", type: "MODERATE" };
    } else if (s >= 29 && s <= 32) {
      temp = { name: "Below average tolerance", type: "BELOW_AVERAGE" };
    } else if (s >= 33) {
      temp = { name: "Conservative", type: "CONSERVATIVE" };
    }
    setPortFolioType(temp);
    setTotal(s);
  }, [finalScore]);

  const onFinish = async (values) => {
    const risk_score = (total / 47) * 5;
    const t = (3.16 - 1.25) / (risk_score * Math.pow(7.67, 2));
    const yScore = Math.min(t * 100, 1);
    if (token && values.invested_amount && portFolioType.type) {
      setLoading(true);

      const res1 = await createPortfolio(token, yScore, portFolioType.type);
      // console.log("res1", res1);
      if (res1.success) {
        const res = await completeProfile(token, {
          ...values,
          portfolio_type: portFolioType.type,
          risk_score,
          portfolio_id: res1.data.id,
        });
        if (!res1.success) {
          toast.error(res.message);
        }
      }

      if (!res1.success) {
        toast.error(res1.message);
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
