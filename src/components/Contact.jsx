import React from "react";

const Contact = () => {
  return (
    <>
      <section className="section contact" aria-label="contact">
        <div className="container">
          <h2 className="headline-md section-title text-center">
            Have Question ? Get in touch!
          </h2>

          <p className="body-md section-text text-center">
            We believe in connecting fans with the artists therefore you will
            get instant notification whenever your favourites collections are
            updated
          </p>

          <a href="#" className="btn btn-primary">
            <ion-icon name="call-outline" aria-hidden="true"></ion-icon>

            <span className="span">Contact us</span>
          </a>
        </div>
      </section>
    </>
  );
};

export default Contact;
