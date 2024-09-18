import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarsThunk } from "../../redux/operations";
import { selectCars } from "../../redux/selectors";
import Filters from "../Filters/Filters";
import CarList from "../CarList/CarList";
import LoadMore from "../LoadMore/LoadMore";
import DateRangePicker from "../DateRangePicker/DateRangePicker";
import { makes } from "../../helpers/makes";
import { prices } from "../../helpers/prices";

const Catalog = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);

  const [visibleCount, setVisibleCount] = useState(12);
  const [filteredCars, setFilteredCars] = useState([]);
  const [selectedMakes, setSelectedMakes] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  const unavailableDates = ["2024-09-20", "2024-09-21", "2024-09-25"];

  useEffect(() => {
    dispatch(fetchCarsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (cars && cars.length > 0) {
      setFilteredCars(cars);
    }
  }, [cars]);

  const applyFilters = () => {
    const filtered = cars.filter((car) => {
      const matchesMake = selectedMakes ? car.make === selectedMakes : true;
      const matchesPrice = selectedPrice
        ? parseInt(car.rentalPrice.replace("$", "")) <= selectedPrice
        : true;
      return matchesMake && matchesPrice;
    });
    setFilteredCars(filtered);
  };

  const visibleCars = filteredCars.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 12); //
  };

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
      <button type="submit" onClick={applyFilters}>
        Search
      </button>

      {visibleCars.length > 0 ? (
        <CarList cars={visibleCars} />
      ) : (
        <p>No cars available</p>
      )}

      {filteredCars.length > visibleCount && (
        <LoadMore
          handleLoadMore={handleLoadMore}
          isVisible={visibleCount < filteredCars.length} // Ось ця умова повинна бути правильною
        />
      )}
    </>
  );
};

export default Catalog;
