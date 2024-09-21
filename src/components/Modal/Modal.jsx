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
            <p className={s.conditionsTitle}>
              Accessories and functionalities:{" "}
            </p>
            {car.accessories.join(" | ")}
            {car.functionalities.join(" | ")}
          </li>

          <li className={s.conditions}>
            <div className={s.conditionsTitle}>
              <p>Rental Conditions: </p>
            </div>

            <div className={s.conditionsText}>
              <p className={s.conditionItem}>
                Minimum age:
                <span className={s.spanTitle}>
                  {car.rentalConditions.split("\n")[0].split(" ")[2]}
                </span>
              </p>
              <p className={s.conditionItem}>Valid driver's license</p>
              <p className={s.conditionItem}>Security deposit required</p>
              <p className={s.conditionItem}>
                Mileage:
                <span className={s.spanTitle}>
                  {car.mileage.toLocaleString("en-US")}
                </span>
              </p>
              <p className={s.conditionItem}>
                Price: <span className={s.spanTitle}>{car.rentalPrice}</span>
              </p>
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
