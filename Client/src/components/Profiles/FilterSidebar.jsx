"use client";

import { useState } from "react";
import Searchbar from "../Search/Searchbar";

const FilterSidebar = ({ categories, onApplyFilters }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({});

  const toggleFilter = (category, option) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };

      if (!newFilters[category]) {
        newFilters[category] = [];
      }

      if (newFilters[category].includes(option)) {
        newFilters[category] = newFilters[category].filter(
          (item) => item !== option
        );
        if (newFilters[category].length === 0) {
          delete newFilters[category];
        }
      } else {
        newFilters[category] = [...newFilters[category], option];
      }

      return newFilters;
    });
  };

  const clearFilters = () => {
    setSelectedFilters({});
    setSearchTerm("");
  };

  const handleApplyFilters = () => {
    const filters = { ...selectedFilters };
    if (searchTerm) {
      filters["search"] = [searchTerm];
    }
    onApplyFilters(filters);
  };

  const isOptionSelected = (category, option) => {
    return selectedFilters[category]?.includes(option) || false;
  };

  const getSelectedFiltersCount = () => {
    let count = 0;
    Object.values(selectedFilters).forEach((options) => {
      count += options.length;
    });
    return count + (searchTerm ? 1 : 0);
  };

  return (
    <div className="filter-sidebar">
      <div className="search-section">
        <h3 className="search-title">Buscar</h3>
        <div className="search-container-users">
        <Searchbar/>
        </div>
      </div>

      <div className="filters-section">
        <h3 className="filters-title">Filtros</h3>
        <div className="filter-categories">
          {categories.map((category) => (
            <div key={category.name} className="filter-category">
              <h4 className="category-title">{category.name}</h4>
              <div className="filter-options">
                {category.options.map((option) => (
                  <button
                    key={option}
                    className={`filter-option ${
                      isOptionSelected(category.name, option) ? "selected" : ""
                    }`}
                    onClick={() => toggleFilter(category.name, option)}
                  >
                    {option}
                    {isOptionSelected(category.name, option) && (
                      <span className="remove-icon">×</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="filter-separator"></div>

      <div className="filter-actions">
        <button onClick={handleApplyFilters} className="apply-filters-btn">
          Aplicar filtros{" "}
          {getSelectedFiltersCount() > 0 && `(${getSelectedFiltersCount()})`}
        </button>
        {getSelectedFiltersCount() > 0 && (
          <button onClick={clearFilters} className="clear-filters-btn">
            Limpiar filtros
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterSidebar;
