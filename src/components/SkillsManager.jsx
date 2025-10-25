import React, { useEffect, useState } from "react";
import "../css/skills.css";

function SkillsManager() {
  const [categories, setCategories] = useState([]); // contains skills inside each category
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredSkills, setFilteredSkills] = useState({}); // visible skills
  const [newSkill, setNewSkill] = useState("");
  const [addingCategory, setAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  // 🔹 Fetch all categories (each category includes its skills)
  const fetchCategories = () => {
    fetch("http://localhost:8090/getAllCategories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setFilteredSkills(data.flatMap((cat) => cat.skills)); // combine all
      })
      .catch((err) => console.error("Error fetching categories:", err));
  };

  // 🔹 Add new category
  const handleAddCategory = () => {
    if (!newCategory.trim()) return alert("Enter category name!");

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
          setAddingCategory(false);
          fetchCategories();
        } else {
          alert("Failed to add category.");
        }
      })
      .catch((err) => console.error("Error adding category:", err));
  };

  // 🔹 Add new skill
  const handleAddSkill = () => {
    if (!newSkill.trim() || !selectedCategory) {
      alert("Please select category and enter skill name.");
      return;
    }

    const categoryId =
      typeof selectedCategory === "object"
        ? selectedCategory.id
        : selectedCategory;

    fetch(
      `http://localhost:8090/addSkill?name=${encodeURIComponent(
        newSkill
      )}&categoryId=${categoryId}`,
      { method: "POST" }
    )
      .then((res) => {
        if (res.ok) {
          setNewSkill("");
          fetchCategories();
          if (selectedCategory) handleCategoryClick(selectedCategory);
        } else {
          alert("Failed to add skill.");
        }
      })
      .catch((err) => console.error("Error adding skill:", err));
  };

  // 🔹 Delete skill
  const handleDeleteSkill = (id) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;

    fetch(`http://localhost:8090/deleteSkill/${id}`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) fetchCategories();
        else alert("Failed to delete skill.");
      })
      .catch((err) => console.error("Error deleting skill:", err));
  };

  // 🔹 Filter skills by selected category
  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    if (cat.skills) setFilteredSkills(cat.skills);
  };

  // 🔹 Show all skills
  const handleShowAll = () => {
    setSelectedCategory(null);
    setFilteredSkills(categories.flatMap((cat) => cat.skills));
  };

  return (
    <div className="skills-wrapper">
      <h3>Skills Manager</h3>

      {/* Category Section */}
      <div className="category-section">
        <div className="category-list">
          <span
            className={`category-chip ${!selectedCategory ? "active" : ""}`}
            onClick={handleShowAll}
          >
            All
          </span>

          {categories.map((cat) => (
            <span
              key={cat.id}
              className={`category-chip ${
                selectedCategory?.id === cat.id ? "active" : ""
              }`}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat.name}
            </span>
          ))}

          {addingCategory ? (
            <span className="category-add-box">
              <input
                type="text"
                placeholder="New category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <button onClick={handleAddCategory}>Save</button>
              <button
                className="cancel-btn"
                onClick={() => setAddingCategory(false)}
              >
                ✕
              </button>
            </span>
          ) : (
            <button
              className="add-category-btn"
              onClick={() => setAddingCategory(true)}
            >
              + Add Category
            </button>
          )}
        </div>
      </div>

      {/* Add Skill Section */}
      <div className="add-skill-section">
        <input
          type="text"
          placeholder="Enter skill name"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
        />
        <button onClick={handleAddSkill}>Add Skill</button>
      </div>

      {/* Skills List */}
      <div className="skills-list">
        {filteredSkills.length > 0 ? (
          filteredSkills.map((skill) => (
            <div key={skill.id} className="skill-item">
              <span className="skill-label">
                {skill.name}{" "}
                <span className="category-tag">
                  ({skill.category || "No Category"})
                </span>
              </span>
              <button
                className="delete-btn"
                onClick={() => handleDeleteSkill(skill.id)}
              >
                🗑
              </button>
            </div>
          ))
        ) : (
          <p className="no-data">No skills found.</p>
        )}
      </div>
    </div>
  );
}

export default SkillsManager;
