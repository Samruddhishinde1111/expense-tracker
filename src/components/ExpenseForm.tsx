import React, { useState, useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { v4 as uuidv4 } from "uuid";
import { Button, Input, DatePicker, Select } from "antd";

const { Option } = Select;

const ExpenseForm = () => {
   const expenseContext = useContext(ExpenseContext);
   if (!expenseContext) return null;
   const { addExpense } = expenseContext;

   const [amount, setAmount] = useState(0);
   const [date, setDate] = useState<string | null>(null);
   const [description, setDescription] = useState("");
   const [category, setCategory] = useState("");

   const handleSubmit = () => {
       if (amount && date && description && category) {
           addExpense({
               id: uuidv4(),
               amount,
               date,
               description,
               category,
               paid: false,
           });
       }
   };

   return (
       <div>
           <Input type="number" placeholder="Amount" onChange={(e) => setAmount(Number(e.target.value))} />
           <DatePicker onChange={(date, dateString) => setDate(dateString as string)} />
           <Input placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
           <Select placeholder="Category" onChange={(value) => setCategory(value)}>
               <Option value="Food">Food</Option>
               <Option value="Transport">Transport</Option>
               <Option value="Entertainment">Entertainment</Option>
           </Select>
           <Button type="primary" onClick={handleSubmit}>Add Expense</Button>
       </div>
   );
};

export default ExpenseForm;
