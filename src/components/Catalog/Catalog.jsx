import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarsThunk } from "../../redux/operations";
import { selectCars } from "../../redux/selectors";
import Filters from "../Filters/Filters";
import CarList from "../CarList/CarList";
import LoadMore from "../LoadMore/LoadMore";
import { makes } from "../../helpers/makes";
import { prices } from "../../helpers/prices";

const Catalog = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);

  const [visibleCount, setVisibleCount] = useState(12);
  const [filteredCars, setFilteredCars] = useState([]);
  const [selectedMakes, setSelectedMakes] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  useEffect(() => {
    dispatch(fetchCarsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (cars && cars.length > 0) {
      setFilteredCars(cars);
    }
  }, [cars]);

  const applyFilters = (minMileage, maxMileage) => {
    const filtered = cars.filter((car) => {
      const matchesMake = selectedMakes ? car.make === selectedMakes : true;
      const matchesPrice = selectedPrice
        ? parseInt(car.rentalPrice.replace("$", "")) <= selectedPrice
        : true;

      // Перевіряємо пробіг
      const matchesMileage =
        (!minMileage || car.mileage >= minMileage) &&
        (!maxMileage || car.mileage <= maxMileage);

      return matchesMake && matchesPrice && matchesMileage;
    });
    setFilteredCars(filtered);
  };

  const visibleCars = filteredCars.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 12);
  };

  const isLoadMoreVisible = visibleCount < filteredCars.length;

  return (
    <>
      <Filters
        selectedMakes={selectedMakes}
        setSelectedMakes={setSelectedMakes}
        selectedPrice={selectedPrice}
        setSelectedPrice={setSelectedPrice}
        applyFilters={applyFilters} // Передаємо фільтрацію пробігу
      />

      {visibleCars.length > 0 ? (
        <CarList cars={visibleCars} />
      ) : (
        <p>No cars available</p>
      )}

      {filteredCars.length > visibleCount && (
        <LoadMore
          handleLoadMore={handleLoadMore}
          isVisible={isLoadMoreVisible}
        />
      )}
    </>
  );
};

export default Catalog;
