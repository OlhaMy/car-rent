import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarsThunk } from "../../redux/operations";
import { selectCars } from "../../redux/selectors";
import { PiSmileyMeltingLight } from "react-icons/pi";

import Filters from "../Filters/Filters";
import CarList from "../CarList/CarList";
import LoadMore from "../LoadMore/LoadMore";
import Loader from "../Loader/Loader";

import s from "./Catalog.module.css";

const Catalog = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);

  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12);
  const [filteredCars, setFilteredCars] = useState([]);
  const [selectedMakes, setSelectedMakes] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  useEffect(() => {
    setLoading(true);
    dispatch(fetchCarsThunk()).finally(() => {
      setLoading(false);
    });
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
    <div className={s.wrapper}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Filters
            selectedMakes={selectedMakes}
            setSelectedMakes={setSelectedMakes}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
            applyFilters={applyFilters}
          />

          {visibleCars.length > 0 ? (
            <CarList cars={visibleCars} />
          ) : (
            <div className={s.textContainer}>
              <p className={s.text}>
                <PiSmileyMeltingLight />
                Sorry! This car is unavailable. Please choose another option.
              </p>
            </div>
          )}

          {filteredCars.length > visibleCount && (
            <div className={s.loadMoreContainer}>
              <LoadMore
                handleLoadMore={handleLoadMore}
                isVisible={isLoadMoreVisible}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Catalog;
