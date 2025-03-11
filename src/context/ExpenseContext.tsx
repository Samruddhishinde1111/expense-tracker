import React, { createContext, useContext, useState, useEffect } from 'react';

interface Category {
  id: string;
  name: string;
}

interface Expense {
  id: string;
  amount: number;
  date: string;
  description: string;
  categoryId: string;
  paymentMethod: string;
  status: 'Paid' | 'Unpaid';
}

interface ExpenseContextType {
  expenses: Expense[];
  categories: Category[];
  addExpense: (expense: Expense) => void;
  editExpense: (id: string, updatedExpense: Expense) => void;
  deleteExpense: (id: string) => void;
  addCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const storedExpenses = localStorage.getItem('expenses');
    const storedCategories = localStorage.getItem('categories');
    if (storedExpenses) setExpenses(JSON.parse(storedExpenses));
    if (storedCategories) setCategories(JSON.parse(storedCategories));
  }, []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [expenses, categories]);

  const addExpense = (expense: Expense) => {
    setExpenses([...expenses, expense]);
  };

  const editExpense = (id: string, updatedExpense: Expense) => {
    setExpenses(expenses.map(exp => (exp.id === id ? updatedExpense : exp)));
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const addCategory = (category: Category) => {
    setCategories([...categories, category]);
  };

  const deleteCategory = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  return (
    <ExpenseContext.Provider value={{ expenses, categories, addExpense, editExpense, deleteExpense, addCategory, deleteCategory }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenseContext = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpenseContext must be used within an ExpenseProvider");
  }
  return context;
};
