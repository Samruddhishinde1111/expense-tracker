import React, { useState } from "react";
import { getCategories, addCategory, removeCategory } from "../utils/categories";  // Corrected Import

const CategoryManager: React.FC = () => {
  const [categories, setCategories] = useState<string[]>(getCategories());
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    addCategory(newCategory);
    setCategories([...getCategories()]); // Update state
    setNewCategory("");
  };

  const handleRemoveCategory = (category: string) => {
    removeCategory(category);
    setCategories([...getCategories()]); // Update state
  };

  return (
    <div>
      <h2>Manage Categories</h2>
      <input 
        type="text" 
        value={newCategory} 
        onChange={(e) => setNewCategory(e.target.value)} 
        placeholder="New Category" 
      />
      <button onClick={handleAddCategory}>Add</button>
      <ul>
        {categories.map((category) => (
          <li key={category}>
            {category} <button onClick={() => handleRemoveCategory(category)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManager;
