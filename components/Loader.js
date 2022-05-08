import React from "react";
import { Spin } from "antd";

function Loader({ style }) {
  return <Spin size="large" style={style} />;
}

export default Loader;
