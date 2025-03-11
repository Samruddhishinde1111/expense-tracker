export const categories: string[] = ["Food", "Transport", "Entertainment", "Utilities", "Healthcare", "Others"];

export const getCategories = (): string[] => {
  return categories;
};

export const addCategory = (category: string): void => {
  if (!categories.includes(category)) {
    categories.push(category);
  }
};

export const removeCategory = (category: string): void => {
  const index = categories.indexOf(category);
  if (index !== -1) {
    categories.splice(index, 1);
  }
};
