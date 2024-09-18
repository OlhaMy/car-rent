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

        <img src={car.img} alt={car.model} className={s.modalImg} />

        <ul className={s.list}>
          <li>
            <h2 className={s.title}>
              {car.make} <span className={s.spanTitle}>{car.type}</span>,{" "}
              {car.year}
            </h2>
          </li>

          <li className={s.titleDescription}>
            <p>{car.address}</p>
            <p>Id: {car.id}</p>
            <p>Year: {car.year}</p>
            <p>Type: {car.type}</p>
            <p>Fuel consumption: {car.fuelConsumption}</p>
            <p>Engine size: {car.engineSize}</p>
          </li>

          <li className={s.description}>{car.description}</li>

          <li className={s.accessories}>
            <p>Accessories and functionalities: </p>
            {car.accessories.join(" | ")}
            {car.functionalities.join(" | ")}
          </li>

          <li className={s.conditions}>
            <p>Rental Conditions: </p>
            <div className={s.conditionItem}>
              Minimum age: {car.rentalConditions.age}
            </div>
            <div className={s.conditionItem}>Valid driver's license</div>
            <div className={s.conditionItem}>Security deposit required</div>
            <div className={`${s.conditionItem} ${s.highlight}`}>
              Mileage: {car.mileage}
            </div>
            <div className={`${s.conditionItem} ${s.highlight}`}>
              Price: {car.rentalPrice}
            </div>
          </li>

          <li>
            <a
              href="tel:+380730000000"
              className={s.rentalCarButton}
              target="blank"
            >
              Rental car
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Modal;
