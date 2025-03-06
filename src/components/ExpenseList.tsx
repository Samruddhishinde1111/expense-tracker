import React from "react";
import { Table, Button } from "antd";

const ExpenseList: React.FC = () => {
  const expenses = [
    { key: "1", description: "Lunch", amount: 200, category: "Food", paymentMethod: "Cash", receipt: "receipt1.jpg" },
    { key: "2", description: "Bus Ticket", amount: 50, category: "Transport", paymentMethod: "Credit Card", receipt: "" },
  ];

  const exportToCSV = () => {
    console.log("Exporting to CSV...");
  };

  const exportToPDF = () => {
    console.log("Exporting to PDF...");
  };

  return (
    <div>
      <Button onClick={exportToCSV}>Export CSV</Button>
      <Button onClick={exportToPDF}>Export PDF</Button>
      
      <Table dataSource={expenses} columns={[
        { title: "Description", dataIndex: "description", key: "description" },
        { title: "Amount", dataIndex: "amount", key: "amount" },
        { title: "Category", dataIndex: "category", key: "category" },
        { title: "Payment Method", dataIndex: "paymentMethod", key: "paymentMethod" },
        { title: "Receipt", dataIndex: "receipt", key: "receipt", render: (text) => text ? <a href={text}>View</a> : "No receipt" },
      ]} />
    </div>
  );
};

export default ExpenseList;
