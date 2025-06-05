import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import MenuItem from "../components/MenuItem";
import CategoryFilter from "../components/CategoryFilter";
import { OrderContext } from "../context/OrderContext";
import "../styles/menu.css";

function MenuPage() {
  const { addToOrder } = useContext(OrderContext);
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/menus`)
      .then((response) => {
        const restaurantMenu = response.data.find(
          (m) => m.restaurantId === parseInt(restaurantId)
        );
        setMenu(restaurantMenu ? restaurantMenu.items : []);
      })
      .catch((error) => console.error("Fel vid hämtning av meny:", error));
  }, [restaurantId]);

  const filteredMenu = filter
    ? menu.filter((item) => item.category === filter)
    : menu;

  return (
    <div>
      <h1>Vår Meny</h1>
      <CategoryFilter setFilter={setFilter} />
      <div className="menu-list">
        {filteredMenu.map((item) => (
          <MenuItem key={item.id} item={item} addToOrder={addToOrder} />
        ))}
      </div>
    </div>
  );
}

export default MenuPage;
