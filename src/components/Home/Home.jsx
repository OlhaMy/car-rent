import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import s from "./Home.module.css";

const Home = () => {
  const [visibleDivs, setVisibleDivs] = useState([false, false, false, false]);

  useEffect(() => {
    const timer = setTimeout(() => {
      visibleDivs.forEach((_, index) => {
        setTimeout(() => {
          setVisibleDivs((prev) => {
            const newDivs = [...prev];
            newDivs[index] = true;
            return newDivs;
          });
        }, index * 1000);
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={s.hero}>
      <div className={s.highway}></div>
      <div className={s.city}></div>
      <div className={s.welcome}>
        <h1>
          <span>Welcome to our </span> &nbsp;<span>rental car service!</span>
        </h1>
        <Link className={s.check} to="/catalog">
          Check out our garage
        </Link>
      </div>

      <div className={s.infoBoxContainer}>
        <div
          className={`${s.infoBox} ${s.left} ${visibleDivs[0] ? s.show : ""}`}
        >
          <p>Drive your favorite car affordably.</p>
        </div>
        <div
          className={`${s.infoBox} ${s.left} ${visibleDivs[1] ? s.show : ""}`}
        >
          <p>Perfect car for any occasion.</p>
        </div>

        <div
          className={`${s.infoBox} ${s.right} ${visibleDivs[2] ? s.show : ""}`}
        >
          <p>Quick booking, stylish road trips.</p>
        </div>
        <div
          className={`${s.infoBox} ${s.right} ${visibleDivs[3] ? s.show : ""}`}
        >
          <p>Save more with long-term rentals.</p>
        </div>
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
