import { Link } from "react-router-dom";
import s from "./Home.module.css";

const Home = () => {
  return (
    <div className={s.hero}>
      <div className={s.highway}></div>
      <div className={s.city}></div>
      <div className={s.welcome}>
        <h1>Welcome to our rental car service!</h1>
        <Link className={s.check} to="/catalog">
          Check out our garage
        </Link>
      </div>

      <div className={s.car}>
        <img src="./Car_Animation_Img/car.png" alt="car" />
      </div>
      <div className={s.wheel}>
        <img
          src="./Car_Animation_Img/wheel.png"
          alt="wheel"
          className={s.back}
        />
        <img
          src="./Car_Animation_Img/wheel.png"
          alt="wheel"
          className={s.front}
        />
      </div>
    </div>
  );
};

export default Home;
