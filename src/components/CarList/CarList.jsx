// CarList.jsx
import React from "react";

const CarList = ({ cars }) => {
  return (
    <div className="catalog">
      {cars.map((car) => (
        <div key={car.id}>
          <img src={car.img} alt={car.model} />
          <h3>
            {car.make} {car.model} {car.year}
          </h3>
          <p>${car.rentalPrice}</p>|<p>{car.mileage} км</p>|
          <p>{car.rentalCompany}</p>
        </div>
      ))}
    </div>
  );
};

export default CarList;
