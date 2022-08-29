import React from "react";
import { Bar } from "@ant-design/plots";

// eslint-disable-next-line react/prop-types
const DemoBar = ({ senders, deliverers }) => {
  const data = [
    {
      group: "Senders",
      value: senders,
    },
    {
      group: "Deliverers",
      value: deliverers,
    },
  ];
  const config = {
    data,
    autoFit: true,
    color: ["#022b3a", "#1f7a8c"],
    height: 100,
    xField: "value",
    yField: "group",
    seriesField: "group",
    legend: {
      position: "top-left",
    },
  };
  return <Bar {...config} />;
};

export default DemoBar;
