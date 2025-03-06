import React from "react";
import { Card, Progress } from "antd";

const ExpenseSummary: React.FC = () => {
  const totalSpent = 5000;
  const budget = 10000;
  const progress = (totalSpent / budget) * 100;

  return (
    <Card title="Expense Summary">
      <p>Total Spent: ₹{totalSpent}</p>
      <p>Budget: ₹{budget}</p>
      <Progress percent={progress} status={progress > 80 ? "exception" : "active"} />
    </Card>
  );
};

export default ExpenseSummary;
