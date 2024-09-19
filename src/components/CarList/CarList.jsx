import { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import { Icons } from "../Icons/Icons";
import clsx from "clsx";
import s from "./CarList.module.css";
import { Link } from "react-router-dom";
import {
  saveFavoritesToLocalStorage,
  loadFavoritesFromLocalStorage,
} from "../../helpers/localStorage";

const CarList = ({ cars }) => {
  const [selectedCar, setSelectedCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = loadFavoritesFromLocalStorage();
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    saveFavoritesToLocalStorage(favorites);
  }, [favorites]);

  const toggleFavorite = (carId) => {
    if (favorites.includes(carId)) {
      setFavorites(favorites.filter((id) => id !== carId));
    } else {
      setFavorites([...favorites, carId]);
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
        {cars.map((car, index) => (
          <li key={car.id || index} className={s.item}>
            <div className={s.imgWrapper}>
              <button
                className={clsx(s.heartBtn, {
                  [s.heartBtnActive]: favorites.includes(car.id),
                })}
                onClick={() => toggleFavorite(car.id)}
              >
                <Icons
                  name="heart"
                  className={clsx(s.heartIcon, {
                    [s.heartIconActive]: favorites.includes(car.id),
                  })}
                />
              </button>
              <img className={s.img} src={car.img} alt={car.model} />
            </div>
            <h3 className={s.title}>
              <span className={s.spanMake}>
                {car.make} {car.year}
              </span>
              <span className={s.spanPrice}> {car.rentalPrice}</span>
            </h3>
            <div className={s.description}>
              <p>{car.address}</p>
              <p>{car.mileage}км</p>
              <p>{car.model}</p>
              <p>{car.rentalCompany}</p>
              <p>{car.type}</p>
              <p>{car.makes}</p>
              <p>{car.mileage}</p>
              <p>{car.accessories}</p>
            </div>
            <button onClick={() => openModal(car)}>Learn more</button>
          </li>
        ))}
      </ul>

      <Modal car={selectedCar} isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default CarList;
