import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import s from "./Favorites.module.css";
import CarItem from "../CarItem/CarItem";
import { loadFavoritesFromLocalStorage } from "../../helpers/localStorage";
import Modal from "../Modal/Modal";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedFavorites = loadFavoritesFromLocalStorage();
    setFavorites(savedFavorites);
  }, []);

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
            openModal={openModal}
          />
        ))}
      </ul>

      <Modal car={selectedCar} isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Favorites;
