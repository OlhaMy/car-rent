import { useState } from "react";
import Modal from "../Modal/Modal";
import s from "./CarList.module.css";

const CarList = ({ cars }) => {
  const [selectedCar, setSelectedCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCar(null);
    setIsModalOpen(false);
  };

  return (
    <ul className={s.list}>
      {cars.map((car) => (
        <li key={car.id} className={s.item}>
          <img className={s.img} src={car.img} alt={car.model} />
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
      <Modal car={selectedCar} isOpen={isModalOpen} onClose={closeModal} />
    </ul>
  );
};

export default CarList;
