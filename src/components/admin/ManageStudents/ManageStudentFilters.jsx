import { Search, Flame, AlertTriangle, Ban } from "lucide-react";

function ManageStudentFilters({ filters, setFilters, searchTerm, setSearchTerm }) {
  const update = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      status: "All",
    });
  };

  const toggleQuick = (type, value) => {
    if (type === "status") {
      update("status", filters.status === value ? "All" : value);
    } else {
      update("performance", filters.performance === value ? "All" : value);
    }
  };

  return (
    <div className="filters-container">
      {/* 🔍 SEARCH + CLEAR */}
      <div className="filters-top">
        <div className="filters-search">
          <Search size={18} />
          <input
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button className="clear-btn" onClick={clearFilters}>
          Clear All
        </button>
      </div>

      {/* 🔥 HORIZONTAL FILTER GRID */}
      <div className="filters-grid">



        {/* 🟢 STATUS */}
        <div className="filter-section">
          <h4>Status</h4>
          <div className="filter-chips">
            {["All", "Active", "Blocked"].map((item) => (
              <button
                key={item}
                className={`chip ${filters.status === item ? "active" : ""}`}
                onClick={() => update("status", item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageStudentFilters;