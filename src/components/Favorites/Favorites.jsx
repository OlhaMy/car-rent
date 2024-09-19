import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import s from "./Favorites.module.css";
import CarItem from "../CarItem/CarItem";
import { loadFavoritesFromLocalStorage } from "../../helpers/localStorage";
import Modal from "../Modal/Modal";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null); // Для обраного автомобіля
  const [isModalOpen, setIsModalOpen] = useState(false); // Для відкриття/закриття модального вікна
  const navigate = useNavigate();

  // Завантажуємо список улюблених з localStorage
  useEffect(() => {
    const savedFavorites = loadFavoritesFromLocalStorage();
    setFavorites(savedFavorites);
  }, []);

  // Відкриваємо модальне вікно
  const openModal = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  // Закриваємо модальне вікно
  const closeModal = () => {
    setSelectedCar(null);
    setIsModalOpen(false);
  };

  if (favorites.length === 0) {
    return (
      <div className={s.empty}>
        <h2>You don´t have favorite cars</h2>
        <button onClick={() => navigate("/catalog")}>
          Go to advertisements
        </button>
      </div>
    );
  }

  return (
    <>
      <ul className={s.list}>
        {favorites.map((car) => (
          <CarItem
            key={car.id}
            car={car}
            isFavorite={true} // На сторінці "Favorites" всі автомобілі є улюбленими
            openModal={openModal} // Передаємо функцію для відкриття модального вікна
          />
        ))}
      </ul>

      {/* Модальне вікно */}
      <Modal car={selectedCar} isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Favorites;
