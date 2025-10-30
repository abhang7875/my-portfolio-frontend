import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { API_URLS } from "../constants";
import "../css/skills.css";

function SkillsSection() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(API_URLS.CATEGORY.VIEW_ALL)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  return (
    <div className="skills-wrapper container-fluid mt-1 bg-light pt-2">
      <div className="row">
        {categories
          .sort((a, b) => a.id - b.id)
          .map((category) => (
            <div className="col-md-6 col-10 mb-4" key={category.id}>
              <div className="row skills-category">
                <h3 className="h3 text-center fw-semibold mb-3">
                  {category.name}
                </h3>
                <div className="d-flex flex-wrap gap-2">
                  {category.skills && category.skills.length > 0 ? (
                    category.skills.map((skill) => (
                      <small key={skill.id} className="fw-semibold skill-chip">
                        {skill.name}
                      </small>
                    ))
                  ) : (
                    <p className="text-muted small">No skills added yet</p>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default SkillsSection;
