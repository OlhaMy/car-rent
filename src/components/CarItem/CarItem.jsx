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
        <p>{car.address.toString().split(",").slice(1, 3).join(" | ")}</p>

        <p>{car.rentalCompany.toString().split(" ").slice(0, 1).join(" ")}</p>
        <p>{car.accessories.toString().split(" ").slice(0, 2).join(" ")}</p>
        <p>{car.model}</p>
        <p>{car.makes}</p>
        <p>{car.mileage}</p>
        <p>
          {car.functionalities?.toString().split(" ").slice(0, 2).join(" ")}
        </p>
      </div>

      <button className={s.learnMoreBtn} onClick={() => openModal(car)}>
        Learn more
      </button>
    </li>
  );
};

export default CarItem;
