import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, DatePicker, Select } from "antd";

const RecurringExpenses: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [recurringExpenses, setRecurringExpenses] = useState<any[]>([]);

  const handleAddExpense = (values: any) => {
    setRecurringExpenses([...recurringExpenses, { ...values, key: recurringExpenses.length + 1 }]);
    setVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)}>Add Recurring Expense</Button>
      
      <Table dataSource={recurringExpenses} columns={[
        { title: "Description", dataIndex: "description", key: "description" },
        { title: "Amount", dataIndex: "amount", key: "amount" },
        { title: "Frequency", dataIndex: "frequency", key: "frequency" },
        { title: "Next Due Date", dataIndex: "nextDue", key: "nextDue" },
      ]} />
      
      <Modal visible={visible} onCancel={() => setVisible(false)} footer={null} title="Add Recurring Expense">
        <Form onFinish={handleAddExpense} layout="vertical">
          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          
          <Form.Item name="amount" label="Amount" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>

          <Form.Item name="frequency" label="Frequency" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="weekly">Weekly</Select.Option>
              <Select.Option value="monthly">Monthly</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="nextDue" label="Next Due Date" rules={[{ required: true }]}>
            <DatePicker />
          </Form.Item>

          <Button type="primary" htmlType="submit">Save</Button>
        </Form>
      </Modal>
    </div>
  );
};

export default RecurringExpenses;
