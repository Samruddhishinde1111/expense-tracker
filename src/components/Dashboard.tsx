export {}; // ✅ Fix for --isolatedModules issue

import React from "react";
import { Layout, Row, Col, Card } from "antd";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import ExpenseFilter from "./ExpenseFilter";
import ExpenseSummary from "./ExpenseSummary";
import RecurringExpenses from "./RecurringExpenses";


const { Header, Content } = Layout;

const Dashboard: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ color: "#fff", fontSize: "24px", textAlign: "center" }}>
        Expense Tracker
      </Header>
      
      <Content style={{ padding: "20px" }}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <ExpenseSummary />
          </Col>

          <Col span={24}>
            <Card title="Filter Expenses">
              <ExpenseFilter />
            </Card>
          </Col>

          <Col span={12}>
            <Card title="Add New Expense">
              <ExpenseForm />
            </Card>
          </Col>
          
          <Col span={12}>
            <Card title="Recurring Expenses">
              <RecurringExpenses />
            </Card>
          </Col>

          <Col span={24}>
            <Card title="Expense History">
              <ExpenseList />
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Dashboard;
