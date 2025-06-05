import React from "react";

const CategoryFilter = ({ setFilter }) => {
  return (
    <div className="category-filter">
      <button onClick={() => setFilter("huvudrätter")}>Huvudrätter</button>
      <button onClick={() => setFilter("förrätter")}>Förrätter</button>
      <button onClick={() => setFilter("efterrätter")}>Efterrätter</button>
      <button onClick={() => setFilter("drycker")}>Drycker</button>
      <button onClick={() => setFilter("")}>Visa allt</button>
    </div>
  );
};

export default CategoryFilter;
