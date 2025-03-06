import React from "react";
import { Form, Select, DatePicker, Button } from "antd";

const { Option } = Select;
const { RangePicker } = DatePicker;

const ExpenseFilter: React.FC = () => {
  return (
    <Form layout="inline">
      <Form.Item label="Date Range">
        <RangePicker />
      </Form.Item>

      <Form.Item label="Category">
        <Select>
          <Option value="all">All</Option>
          <Option value="food">Food</Option>
          <Option value="transport">Transport</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Payment Method">
        <Select>
          <Option value="all">All</Option>
          <Option value="cash">Cash</Option>
          <Option value="credit-card">Credit Card</Option>
        </Select>
      </Form.Item>

      <Button type="primary">Apply Filters</Button>
    </Form>
  );
};

export default ExpenseFilter;
