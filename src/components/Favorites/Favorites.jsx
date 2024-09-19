import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import s from "./Favorites.module.css";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  // Завантажуємо список улюблених з localStorage при завантаженні компонента
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  if (favorites.length === 0) {
    return (
      <div className={s.empty}>
        <h2>You don´t have favorites car</h2>
        <button onClick={() => navigate("/catalog")}>
          Go to advertisements
        </button>
      </div>
    );
  }

  return (
    <ul className={s.list}>
      {favorites.map((car, index) => (
        <li key={car.id || index} className={s.item}>
          <img className={s.img} src={car.img} alt={car.model} />
          <h3>
            {car.make} {car.year}
          </h3>
          <p>{car.rentalPrice}</p>
          <p>{car.model}</p>
        </li>
      ))}
    </ul>
  );
};

export default Favorites;
