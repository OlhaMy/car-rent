import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarsThunk } from "../../redux/operations";
import { selectCars } from "../../redux/selectors";
import Filters from "../Filters/Filters";
import CarList from "../CarList/CarList";
import LoadMore from "../LoadMore/LoadMore";
import DateRangePicker from "../DateRangePicker/DateRangePicker";
import { makes } from "../../helpers/makes"; // Імпорт марок автомобілів
import { prices } from "../../helpers/prices"; // Імпорт списку цін

const Catalog = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);

  // Лог для перевірки отриманих машин з Redux store
  console.log("Fetched cars from store:", cars);

  const [visibleCount, setVisibleCount] = useState(12); // Кількість видимих елементів
  const [filteredCars, setFilteredCars] = useState([]); // Додаємо стан для відфільтрованих машин
  const [selectedMakes, setSelectedMakes] = useState(""); // Вибрана марка
  const [selectedPrice, setSelectedPrice] = useState(""); // Вибрана ціна

  const unavailableDates = ["2024-09-20", "2024-09-21", "2024-09-25"]; // Приклад недоступних дат

  // Завантаження автомобілів при першому рендері
  useEffect(() => {
    dispatch(fetchCarsThunk());
  }, [dispatch]);

  // Ініціалізуємо filteredCars усіма машинами при першому рендері або при завантаженні машин
  useEffect(() => {
    if (cars && cars.length > 0) {
      console.log("Cars from store (filtered):", cars);
      setFilteredCars(cars);
    }
  }, [cars]);

  // Фільтрація автомобілів за маркою і ціною
  const applyFilters = () => {
    const filtered = cars.filter((car) => {
      const matchesMake = selectedMakes ? car.make === selectedMakes : true;
      const matchesPrice = selectedPrice
        ? parseInt(car.rentalPrice.replace("$", "")) <= selectedPrice
        : true;
      return matchesMake && matchesPrice;
    });
    setFilteredCars(filtered); // Оновлюємо стан filteredCars після фільтрації
  };

  // Видимі автомобілі (обмеження на кількість, яке збільшується по кліку на "Load More")
  const visibleCars = filteredCars.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 12); // Завантажити ще 12 автомобілів
  };

  return (
    <>
      {/* Фільтри для марок і цін */}
      <Filters
        selectedMakes={selectedMakes}
        setSelectedMakes={setSelectedMakes}
        selectedPrice={selectedPrice}
        setSelectedPrice={setSelectedPrice}
        makes={makes} // Підставляємо дані з makes.js
        prices={prices} // Підставляємо дані з prices.js
      />

      <h2>Сar mileage/km</h2>
      <DateRangePicker unavailableDates={unavailableDates} />
      <button type="submit" onClick={applyFilters}>
        Search
      </button>

      {/* Список автомобілів */}
      {visibleCars.length > 0 ? (
        <CarList cars={visibleCars} />
      ) : (
        <p>No cars available</p>
      )}

      {/* Кнопка для завантаження більше автомобілів */}
      {filteredCars.length > visibleCount && (
        <LoadMore
          handleLoadMore={handleLoadMore}
          isVisible={visibleCount < filteredCars.length} // Кнопка відображається тільки, якщо є ще автомобілі
        />
      )}
    </>
  );
};

export default Catalog;
