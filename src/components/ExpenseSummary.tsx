import React from "react";
import { Card, Statistic, Progress } from "antd";
import { Expense } from "../App";

interface ExpenseSummaryProps {
  expenses: Expense[];
}

const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({ expenses }) => {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  // Dummy budget value for now, can be dynamic later
  const monthlyBudget = 20000; 
  const budgetUsage = (totalExpenses / monthlyBudget) * 100;

  return (
    <Card title="Expense Summary" style={{ marginBottom: 20 }}>
      <Statistic title="Total Expenses" value={totalExpenses} prefix="₹" />
      <p style={{ marginTop: 10 }}>Budget Usage:</p>
      <Progress percent={Math.min(budgetUsage, 100)} status={budgetUsage > 100 ? "exception" : "active"} />
    </Card>
  );
};

export default ExpenseSummary;
