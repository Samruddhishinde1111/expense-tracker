import React from "react";
import { Form, Input, InputNumber, Button, Select, DatePicker, message } from "antd";
import { Expense } from "../App";
import { getCategories } from "../utils/categories";

interface ExpenseFormProps {
  addExpense: (expense: Expense) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ addExpense }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    const newExpense: Expense = {
      id: Date.now(),
      amount: values.amount,
      date: values.date.format("YYYY-MM-DD"),
      description: values.description,
      category: values.category,
      paid: false,
    };
    addExpense(newExpense);
    form.resetFields();
  };

  return (
    <div>
      <h3>Add New Expense</h3>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item name="amount" label="Amount" rules={[{ required: true, message: "Enter amount" }]}>
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="date" label="Date" rules={[{ required: true, message: "Select date" }]}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input placeholder="Optional" />
        </Form.Item>
        <Form.Item name="category" label="Category" rules={[{ required: true, message: "Select category" }]}>
          <Select placeholder="Select category">
            {getCategories().map(cat => (
              <Select.Option key={cat} value={cat}>{cat}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Add Expense</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ExpenseForm;
