import React, { createContext, useState, useEffect } from "react";
import { getExpenses, saveExpenses } from "../utils/storage";

export interface Expense {
    id: string;
    amount: number;
    date: string;
    description: string;
    category: string;
    paid: boolean;
}

interface ExpenseContextType {
    expenses: Expense[];
    addExpense: (expense: Expense) => void;
    removeExpense: (id: string) => void;
    updateExpense: (updatedExpense: Expense) => void;
}

export const ExpenseContext = createContext<ExpenseContextType | null>(null);

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [expenses, setExpenses] = useState<Expense[]>(getExpenses());

    useEffect(() => {
        saveExpenses(expenses);
    }, [expenses]);

    const addExpense = (expense: Expense) => setExpenses([...expenses, expense]);

    const removeExpense = (id: string) => setExpenses(expenses.filter(exp => exp.id !== id));

    const updateExpense = (updatedExpense: Expense) =>
        setExpenses(expenses.map(exp => (exp.id === updatedExpense.id ? updatedExpense : exp)));

    return (
        <ExpenseContext.Provider value={{ expenses, addExpense, removeExpense, updateExpense }}>
            {children}
        </ExpenseContext.Provider>
    );
};
