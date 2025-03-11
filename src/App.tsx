import React, { useState, useEffect } from "react";
import { Layout, Tabs, message } from "antd";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseSummary from "./components/ExpenseSummary";
import ExpenseList from "./components/ExpenseList";
import CategoryManager from "./components/CategoryManager";
import { getCategories } from "./utils/categories"; 

const { Header, Content } = Layout;

export interface Expense {
  id: number;
  amount: number;
  date: string;
  description: string;
  category: string;
  paid: boolean;
}

const App: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const storedExpenses = localStorage.getItem("expenses");
    return storedExpenses ? JSON.parse(storedExpenses) : [];
  });
  
  const [categories, setCategories] = useState<string[]>(getCategories());

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense: Expense) => {
    const updatedExpenses = [...expenses, expense];
    setExpenses(updatedExpenses);
    message.success("Expense added!");
  };

  const removeExpense = (id: number) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(updatedExpenses);
    message.success("Expense deleted!");
  };

  return (
    <Layout style={{ minHeight: "100vh", padding: "20px" }}>
      <Header style={{ background: "#001529", color: "white", fontSize: "20px", textAlign: "center" }}>
        Expense Tracker
      </Header>
      <Content style={{ margin: "20px auto", width: "80%", maxWidth: "600px" }}>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Expenses" key="1">
            <ExpenseSummary expenses={expenses} />
            <ExpenseForm addExpense={addExpense} />
            <ExpenseList expenses={expenses} setExpenses={setExpenses} removeExpense={removeExpense} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Manage Categories" key="2">
            <CategoryManager />
          </Tabs.TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
};

export default App;
