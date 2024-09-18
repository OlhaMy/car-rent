import React from "react";
import { makes } from "../../helpers/makes";
import { prices } from "../../helpers/prices";

const Filters = ({
  selectedMakes,
  setSelectedMakes,
  selectedPrice,
  setSelectedPrice,
  makes,
  prices,
}) => {
  return (
    <div>
      <h2>Car brand</h2>
      <label>
        <select
          value={selectedMakes}
          onChange={(e) => setSelectedMakes(e.target.value)}
        >
          <option>Всі</option>
          {makes.map((make, index) => (
            <option key={`${make}-${index}`} value={make}>
              {make}
            </option>
          ))}
        </select>
      </label>

      <h2>Price/1 hour</h2>
      <label>
        <select
          value={selectedPrice}
          onChange={(e) => setSelectedPrice(e.target.value)}
        >
          <option value="">to $</option>
          {prices.map((price) => (
            <option key={price} value={price}>
              {price}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default Filters;
