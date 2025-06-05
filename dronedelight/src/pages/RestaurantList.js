import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/restaurant.css";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/restaurants")
      .then((response) => setRestaurants(response.data))
      .catch((error) =>
        console.error("Fel vid hämtning av restauranger:", error)
      );
  }, []);

  return (
    <div className="restaurant-container">
      <h1 className="restaurant-titlea">Drone Delight</h1>
      <h2 className="restaurant-titleb">🍽️ Restauranger</h2>
      <div className="restaurant-list">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="restaurant-card"
            onClick={() => navigate(`/menu/${restaurant.id}`)}
          >
            <h3>{restaurant.name}</h3>
            <img
              src={`images/${restaurant.image}`}
              alt={`Restaurang ${restaurant.name}`}
              className="restaurant-img"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
