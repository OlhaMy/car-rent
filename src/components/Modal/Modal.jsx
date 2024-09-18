import React, { useEffect } from "react";
import s from "./Modal.module.css";

const Modal = ({ car, isOpen, onClose }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={s.modalOverlay} onClick={onClose}>
      <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={s.modalClose} onClick={onClose}>
          &times;
        </button>
        <h2>
          {car.make} {car.model}
        </h2>
        <img src={car.img} alt={car.model} className={s.modalImg} />
        <p>{car.description}</p>
        <ul>
          <li>
            <p>Year:</p> {car.year}
          </li>
          <li>
            <p>Fuel Consumption:</p> {car.fuelConsumption}
          </li>
          <li>
            <p>Engine Size:</p> {car.engineSize}
          </li>
          <li>
            <p>Rental Price:</p> {car.rentalPrice}
          </li>
          <li>
            <p>Rental Company:</p> {car.rentalCompany}
          </li>
          <li>
            <p>Address:</p> {car.address}
          </li>
          <li>
            <p>Mileage:</p> {car.mileage} км
          </li>
          <li>
            <p>Rental Conditions:</p> {car.rentalConditions}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Modal;
