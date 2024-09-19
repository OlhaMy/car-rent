import { useState, useEffect } from "react";
import s from "./CarList.module.css";
import { Link } from "react-router-dom";
import {
  saveFavoritesToLocalStorage,
  loadFavoritesFromLocalStorage,
} from "../../helpers/localStorage";
import CarItem from "../CarItem/CarItem";
import Modal from "../Modal/Modal";

const CarList = ({ cars }) => {
  const [favorites, setFavorites] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedFavorites = loadFavoritesFromLocalStorage();
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    saveFavoritesToLocalStorage(favorites);
  }, [favorites]);

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
      <div className={s.nav}>
        <Link to="/favorites" className={s.favoritesLink}>
          Go to favorites car
        </Link>
      </div>

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
