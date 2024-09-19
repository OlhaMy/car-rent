import React, { useState } from "react";
import { makes } from "../../helpers/makes";
import { prices } from "../../helpers/prices";
import s from "./Filters.module.css";

const Filters = ({
  selectedMakes,
  setSelectedMakes,
  selectedPrice,
  setSelectedPrice,
  applyFilters,
}) => {
  const [minMileage, setMinMileage] = useState("");
  const [maxMileage, setMaxMileage] = useState("");

  return (
    <div className={s.wrapper}>
      <div className={s.makes}>
        <h2 className={s.title}>Car brand</h2>
        <label>
          <select
            value={selectedMakes}
            onChange={(e) => setSelectedMakes(e.target.value)}
            className={s.select}
          >
            <option>Всі</option>
            {makes.map((make, index) => (
              <option key={`${make}-${index}`} value={make}>
                {make}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className={s.price}>
        <h2 className={s.title}>Price/1 hour</h2>
        <label>
          <select
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
            className={s.select}
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

      <div className={s.mileageFilter}>
        <h2 className={s.title}>Сar mileage / km</h2>
        <div className={s.mileageInputs}>
          <input
            type="number"
            placeholder="From"
            value={minMileage}
            onChange={(e) => setMinMileage(e.target.value)}
            className={s.input}
          />
          <input
            type="number"
            placeholder="to"
            value={maxMileage}
            onChange={(e) => setMaxMileage(e.target.value)}
            className={s.input}
          />
        </div>
      </div>

      <button
        className={s.btn}
        type="button"
        onClick={() => applyFilters(minMileage, maxMileage)}
      >
        Search
      </button>
    </div>
  );
};

export default Filters;
