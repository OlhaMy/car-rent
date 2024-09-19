import { useState } from "react";
import s from "./CarList.module.css";
import { Link } from "react-router-dom";
import CarItem from "../CarItem/CarItem";
import Modal from "../Modal/Modal";
import useLocalStorage from "../../helpers/localStorage";

const CarList = ({ cars }) => {
  const [favorites, setFavorites] = useLocalStorage("favorites", []);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleFavorite = (car) => {
    if (favorites.some((fav) => fav.id === car.id)) {
      setFavorites(favorites.filter((fav) => fav.id !== car.id));
    } else {
      setFavorites([...favorites, car]);
    }
  };

  const openModal = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCar(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <ul className={s.list}>
        {cars.map((car) => (
          <CarItem
            key={car.id}
            car={car}
            toggleFavorite={toggleFavorite}
            isFavorite={favorites.some((fav) => fav.id === car.id)}
            openModal={openModal}
          />
        ))}
      </ul>

      <Modal car={selectedCar} isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default CarList;
