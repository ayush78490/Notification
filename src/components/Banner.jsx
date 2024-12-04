import React from "react";

const Banner = () => {
  return (
    <>
      <section className="section hero" aria-label="home">
        <div className="container">
          <h1 className="headline-lg hero-title">
            Welcome to <span className="span">NotifiAR</span>
          </h1>

          <p className="section-text body-lg">
            A place where you can choose to get notification instantly whenever
            your favourite creator uploads a collection or asset
          </p>

          <a href="#" className="btn">
            Explore now
          </a>
        </div>
      </section>
    </>
  );
};

export default Banner;
