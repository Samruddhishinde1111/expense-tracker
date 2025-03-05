import React from "react";
import ExpenseList from "./components/ExpenseList";
import ExpenseSummary from "./components/ExpenseSummary";

function App() {
    return (
        <div>
            <h1>Expense Tracker</h1>
            <ExpenseSummary />
            <ExpenseList />
        </div>
    );
}

export default App;
