import { FiHeart } from "react-icons/fi";
import clsx from "clsx";
import s from "./CarItem.module.css";

const CarItem = ({ car, toggleFavorite, isFavorite, openModal }) => {
  return (
    <li className={s.item}>
      <div className={s.imgWrapper}>
        <button
          className={clsx(s.heartBtn, {
            [s.heartBtnActive]: isFavorite,
          })}
          onClick={() => toggleFavorite(car)}
        >
          <FiHeart
            name="heart"
            className={clsx(s.heartIcon, {
              [s.heartIconActive]: isFavorite,
            })}
          />
        </button>
        <img className={s.img} src={car.img} alt={car.model} />
      </div>
      <h3 className={s.title}>
        <span className={s.spanMake}>
          {car.make} {car.year}
        </span>
        <span className={s.spanPrice}> {car.rentalPrice}</span>
      </h3>
      <div className={s.description}>
        <p>{car.address}</p>
        <p>{car.mileage}км</p>
        <p>{car.model}</p>
        <p>{car.rentalCompany}</p>
        <p>{car.type}</p>
        <p>{car.makes}</p>
        <p>{car.mileage}</p>
        <p>{car.accessories}</p>
      </div>

      <button className={s.learnMoreBtn} onClick={() => openModal(car)}>
        Learn more
      </button>
    </li>
  );
};

export default CarItem;
