export const getExpenses = (): any[] => {
    return JSON.parse(localStorage.getItem("expenses") || "[]");
};

export const saveExpenses = (expenses: any[]): void => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
};
