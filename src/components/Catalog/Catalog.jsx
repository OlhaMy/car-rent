// Catalog.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCatalog,
  fetchMakes,
  fetchPrice,
} from "../../services/apiMockapi";
import { selectCars, selectMakes, selectPrices } from "../../redux/selectors";
import Filters from "../Filters/Filters";
import CarList from "../CarList/CarList";
import LoadMore from "../LoadMore/LoadMore";
import DateRangePicker from "../DateRangePicker/DateRangePicker";

const Catalog = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);
  const makes = useSelector(selectMakes);
  const prices = useSelector(selectPrices);
  const [visibleCount, setVisibleCount] = useState(12);
  const [selectedMakes, setSelectedMakes] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  const unavailableDates = ["2024-09-20", "2024-09-21", "2024-09-25"];

  useEffect(() => {
    dispatch(fetchCatalog());
    dispatch(fetchMakes());
    dispatch(fetchPrice());
  }, [dispatch]);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 12);
  };

  const visibleCars = cars.slice(0, visibleCount);

  return (
    <>
      <Filters
        selectedMakes={selectedMakes}
        setSelectedMakes={setSelectedMakes}
        selectedPrice={selectedPrice}
        setSelectedPrice={setSelectedPrice}
        makes={makes}
        prices={prices}
      />

      <h2>Сar mileage/km</h2>
      <DateRangePicker unavailableDates={unavailableDates} />
      <button type="submit">Search</button>

      <CarList cars={visibleCars} />

      <LoadMore
        handleLoadMore={handleLoadMore}
        isVisible={visibleCount < cars.length}
      />
    </>
  );
};

export default Catalog;
