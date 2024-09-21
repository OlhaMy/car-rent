import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import CarItem from "../CarItem/CarItem";
import Modal from "../Modal/Modal";
import useLocalStorage from "../../helpers/localStorage";

import s from "./Favorites.module.css";

const Favorites = () => {
  const [favorites, setFavorites] = useLocalStorage("favorites", []);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const toggleFavorite = (car) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== car.id);
    setFavorites(updatedFavorites);
  };

  const openModal = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCar(null);
    setIsModalOpen(false);
  };

  if (favorites.length === 0) {
    return (
      <div className={s.empty}>
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
            isFavorite={true}
            toggleFavorite={toggleFavorite}
            openModal={openModal}
          />
        ))}
      </ul>

      <Modal car={selectedCar} isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Favorites;
