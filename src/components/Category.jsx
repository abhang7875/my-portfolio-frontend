import React, { useEffect, useState } from "react";
import "../css/category.css";

function Category() {
  const [categories, setCategories] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch("http://localhost:8090/getAllCategories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  };

  const handleAddClick = () => {
    setShowInput(true);
  };

  const handleSaveCategory = () => {
    if (!newCategory.trim()) return alert("Please enter a category name");

    fetch(
      `http://localhost:8090/addCategory?name=${encodeURIComponent(
        newCategory
      )}`,
      {
        method: "POST",
      }
    )
      .then((res) => {
        if (res.ok) {
          setNewCategory("");
          setShowInput(false);
          fetchCategories();
        } else {
          alert("Failed to add category");
        }
      })
      .catch((err) => console.error(err));
  };

  const deleteCategory = async (id) => {
    try {
      await fetch(`http://localhost:8090/deleteCategory/${id}`, {
        method: "DELETE",
      });
      fetchCategories();
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <div className="category-wrapper">
      <div className="category-container">
        {categories.map((cat) => (
          <span key={cat.id} className="category-label">
            {cat.name}
            <button
              className="delete-btn"
              onClick={() => deleteCategory(cat.id)}
            >
              {" "}
              x{" "}
            </button>
          </span>
        ))}

        {!showInput && (
          <button className="add-btn" onClick={handleAddClick}>
            + Add
          </button>
        )}

        {showInput && (
          <div className="input-group">
            <input
              type="text"
              value={newCategory}
              placeholder="Enter category"
              onChange={(e) => setNewCategory(e.target.value)}
              className="category-input"
            />
            <button className="save-btn" onClick={handleSaveCategory}>
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Category;
