import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, InputNumber, Select, message } from "antd";
import { Expense } from "../App";
import { getCategories } from "../utils/categories";

interface ExpenseListProps {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  removeExpense: (id: number) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, setExpenses, removeExpense }) => {
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showEditModal = (expense: Expense) => {
    setEditingExpense(expense);
    setIsModalVisible(true);
    form.setFieldsValue(expense);
  };

  const handleEditExpense = (values: Expense) => {
    const updatedExpenses = expenses.map(exp =>
      exp.id === editingExpense?.id ? { ...values, id: exp.id } : exp
    );
    setExpenses(updatedExpenses); // ✅ Update state
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    setIsModalVisible(false);
    message.success("Expense updated!");
  };

  const togglePaidStatus = (id: number) => {
    const updatedExpenses = expenses.map(exp =>
      exp.id === id ? { ...exp, paid: !exp.paid } : exp
    );
    setExpenses(updatedExpenses); // ✅ Update state
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    message.success("Payment status updated!");
  };

  const columns = [
    { title: "Amount", dataIndex: "amount", key: "amount", render: (amount: number) => `₹${amount}` },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Category", dataIndex: "category", key: "category" },
    {
      title: "Status",
      dataIndex: "paid",
      key: "paid",
      render: (paid: boolean) => (paid ? "Paid ✅" : "Unpaid ❌"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Expense) => (
        <>
          <Button onClick={() => togglePaidStatus(record.id)} type="link">
            {record.paid ? "Mark Unpaid" : "Mark Paid"}
          </Button>
          <Button onClick={() => showEditModal(record)} type="link">Edit</Button>
          <Button danger onClick={() => removeExpense(record.id)} type="link">Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h3>Expense History</h3>
      <Table dataSource={expenses} columns={columns} rowKey="id" pagination={{ pageSize: 5 }} />

      <Modal
        title="Edit Expense"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleEditExpense} layout="vertical">
          <Form.Item name="amount" label="Amount" rules={[{ required: true, message: "Enter amount" }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="date" label="Date" rules={[{ required: true, message: "Enter date" }]}>
            <Input type="date" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input />
          </Form.Item>
          <Form.Item name="category" label="Category">
            <Select>
              {getCategories().map(cat => (
                <Select.Option key={cat} value={cat}>{cat}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ExpenseList;
