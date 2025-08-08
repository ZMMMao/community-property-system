import React from "react";
import { Badge, Calendar } from "antd";
import "./MyCalendar.css";
const getListData = (value) => {
  let listData = []; // Specify the type of listData
  switch (value.date()) {
    case 8:
      listData = [
        { type: "warning", content: "This is reparing event." },
        { type: "success", content: "This is checking event." },
      ];
      break;
    case 10:
      listData = [
        { type: "warning", content: "This is repairing event." },
        { type: "success", content: "This is checking event." },
        { type: "error", content: "This is BBQ event." },
      ];
      break;
    case 15:
      listData = [
        { type: "warning", content: "This is check-in event" },
        { type: "success", content: "This is very long usual event......" },
        { type: "error", content: "This is error event 1." },
        { type: "error", content: "This is error event 2." },
        { type: "error", content: "This is error event 3." },
        { type: "error", content: "This is error event 4." },
      ];
      break;
    default:
  }
  return listData || [];
};
const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394;
  }
};
const MyCalendar = () => {
  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };
  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events" style={{ listStyle: "none", paddingLeft: 0 }}>
        {listData.map((item) => (
          <li key={item.content} style={{ listStyle: "none", paddingLeft: 0 }}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };
  return (
    <div className="calendar-container">
      <Calendar
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
      />
    </div>
  );
};
export default MyCalendar;
