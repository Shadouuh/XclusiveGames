"use client";

import { useState } from "react";
import ProfileList from "../../components/Profiles/ProfileList";
import FilterSidebar from "../../components/Profiles/FilterSidebar";
import { profiles, filterCategories } from "../../exampleData/profilesData.js";
import "./styles.css";
import { LuUsers, LuSparkles, LuCheckCheck } from "react-icons/lu";

const ProfilesPage = () => {
  const [filteredProfiles, setFilteredProfiles] = useState(profiles);
  const [activeTab, setActiveTab] = useState("todos");
  const [sortOption, setSortOption] = useState("recientes");

  const handleApplyFilters = (selectedFilters) => {
    if (Object.keys(selectedFilters).length === 0) {
      applyTabAndSortFilters(profiles, activeTab, sortOption);
      return;
    }

    const filtered = profiles.filter((profile) => {
      if (selectedFilters.search?.length > 0) {
        const searchTerm = selectedFilters.search[0].toLowerCase();
        const nameMatch = profile.name.toLowerCase().includes(searchTerm);
        const usernameMatch = profile.username.toLowerCase().includes(searchTerm);
        const bioMatch = profile.bio.toLowerCase().includes(searchTerm);

        if (!(nameMatch || usernameMatch || bioMatch)) return false;
      }

      for (const [category, options] of Object.entries(selectedFilters)) {
        if (category === "search" || options.length === 0) continue;

        const profileOptions = profile.categories[category] || [];
        const hasMatch = options.some((option) => profileOptions.includes(option));
        if (!hasMatch) return false;
      }

      return true;
    });

    applyTabAndSortFilters(filtered, activeTab, sortOption);
  };

  const applyTabAndSortFilters = (profilesList, tab, sort) => {
    let result = [...profilesList];

    if (tab === "siguiendo") {
      result = result.filter((profile) => profile.stats.followers > 1000);
    } else if (tab === "sugeridos") {
      result = result.filter((profile) => profile.stats.games > 50);
    }

    switch (sort) {
      case "seguidores":
        result.sort((a, b) => b.stats.followers - a.stats.followers);
        break;
      case "juegos":
        result.sort((a, b) => b.stats.games - a.stats.games);
        break;
      case "reseñas":
        result.sort((a, b) => b.stats.reviews - a.stats.reviews);
        break;
      default:
        break;
    }

    setFilteredProfiles(result);
  };

  const handleTabChange = (value) => {
    setActiveTab(value);
    applyTabAndSortFilters(profiles, value, sortOption);
  };

  const handleSortChange = (value) => {
    setSortOption(value);
    applyTabAndSortFilters(profiles, activeTab, value);
  };

  return (
    <main className="profiles-container">
      <div className="profiles-layout">
        <aside className="profiles-sidebar">
          <div className="sidebar-blur"></div>
          <h1 className="profiles-title">Perfiles de Usuario</h1>
          <FilterSidebar
            categories={filterCategories}
            onApplyFilters={handleApplyFilters}
          />
        </aside>

        <div className="profiles-content">
          <div className="profiles-controls">
            <div className="profiles-tabs">
              {["todos", "siguiendo", "sugeridos"].map((tab) => {
                const icons = {
                  todos: (
                    <LuUsers size={18}/>
                  ),
                  siguiendo: (
                    <LuCheckCheck size={18}/>
                  ),
                  sugeridos: (
                    <LuSparkles size={18}/>
                  ),
                };

                const label = {
                  todos: "Todos",
                  siguiendo: "Siguiendo",
                  sugeridos: "Sugeridos",
                };

                return (
                  <button
                    key={tab}
                    className={`tab-button-user ${activeTab === tab ? "active" : ""}`}
                    onClick={() => handleTabChange(tab)}
                  >
                    <span className="tab-icon">{icons[tab]}</span>
                    <span className="tab-text">{label[tab]}</span>
                  </button>
                );
              })}
            </div>

            <div className="sort-controls">
              <span className="sort-label">Ordenar por:</span>
              <select
                className="sort-select"
                value={sortOption}
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option value="recientes">Más recientes</option>
                <option value="seguidores">Más seguidores</option>
                <option value="juegos">Más juegos</option>
                <option value="reseñas">Más reseñas</option>
              </select>
            </div>
          </div>

          <ProfileList profiles={filteredProfiles} />

          {filteredProfiles.length === 0 && (
            <div className="no-results">
              No se encontraron perfiles con los filtros seleccionados
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ProfilesPage;
