import React, { useState } from "react";
import Select from "react-select";

import { makes } from "../../helpers/makes";
import { prices } from "../../helpers/prices";
import { customStyles } from "../../helpers/selectStyles";

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

  const handleMileageChange = (setter) => (e) => {
    const value = e.target.value;
    setter(value >= 0 ? value : "");
  };

  const handleSubmit = () => {
    applyFilters(minMileage, maxMileage);
    setSelectedMakes("");
    setSelectedPrice("");
    setMinMileage("");
    setMaxMileage("");
  };

  const makeOptions = makes.map((make) => ({
    label: make,
    value: make,
  }));

  const priceOptions = prices.map((price) => ({
    label: `$${price}`,
    value: price,
  }));

  return (
    <div className={s.wrapper}>
      <div className={s.laptopWrapper}>
        <div className={s.makes}>
          <h2 className={s.title}>Car brand</h2>
          <Select
            value={makeOptions.find((option) => option.value === selectedMakes)}
            onChange={(option) => setSelectedMakes(option.value)}
            options={makeOptions}
            styles={customStyles}
            placeholder="Enter the text"
          />
        </div>

        <div className={s.price}>
          <h2 className={s.title}>Price/1 hour</h2>
          <Select
            value={priceOptions.find(
              (option) => option.value === selectedPrice
            )}
            onChange={(option) => setSelectedPrice(option.value)}
            options={priceOptions}
            styles={customStyles}
            placeholder="to $"
          />
        </div>
      </div>

      <div className={s.mileageFilter}>
        <h2 className={s.title}>Car mileage / km</h2>
        <div className={s.mileageInputs}>
          <input
            type="number"
            placeholder="From"
            value={minMileage}
            onChange={handleMileageChange(setMinMileage)}
            className={s.inputFirst}
            min="0"
          />
          <div className={s.line}></div>
          <input
            type="number"
            placeholder="To"
            value={maxMileage}
            onChange={handleMileageChange(setMaxMileage)}
            className={s.inputSecond}
            min="0"
          />
        </div>
      </div>
      <div className={s.btnWrapper}>
        {" "}
        <button className={s.btn} type="button" onClick={handleSubmit}>
          Search
        </button>
      </div>
    </div>
  );
};

export default Filters;
