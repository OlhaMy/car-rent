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
  const [selectedCar, setSelectedCar] = useState(null); // Обраний автомобіль для модального вікна
  const [isModalOpen, setIsModalOpen] = useState(false); // Стан модального вікна

  // Завантажуємо список улюблених з localStorage
  useEffect(() => {
    const savedFavorites = loadFavoritesFromLocalStorage();
    setFavorites(savedFavorites);
  }, []);

  // Зберігаємо список улюблених у localStorage при кожній зміні
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
            openModal={openModal} // Передаємо функцію відкриття модального вікна
          />
        ))}
      </ul>

      {/* Модальне вікно, яке відкривається при кліку на "Learn more" */}
      <Modal car={selectedCar} isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default CarList;
