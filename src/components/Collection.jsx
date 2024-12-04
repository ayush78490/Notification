import React, { useEffect, useState } from "react";
import { collection } from "../data";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { createDataItemSigner, dryrun } from "@permaweb/aoconnect";

const Collection = () => {
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [allCollections, setAllCollections] = useState([]);
  const [latestCollections, setLatestCollections] = useState([]);
  useEffect(async () => {
    const result = await dryrun({
      process: "TFWDmf8a3_nw43GCm_CuYlYoylHAjCcFGbgHfDaGcsg",
      tags: [
        {
          name: "Action",
          value: "Get-Collections",
        },
      ],
      signer: createDataItemSigner(window.arweaveWallet),
      data: "",
    });
    const parsedData = JSON.parse(result.Messages[0].Data);
    setAllCollections(parsedData.Collections);
    let temparr = parsedData.Collections.slice(0, 8);
    setLatestCollections(temparr);
    console.log("this is parsedData.Collections", parsedData.Collections);
    console.log("Hardcoded DB Connections");
  }, []);

  const handleImageClick = async (card, index) => {
    // Toggle the selection of the clicked card
    setSelectedIndexes((prevIndexes) => {
      if (prevIndexes.includes(index)) {
        return prevIndexes.filter((i) => i !== index); // Remove index if already selected
      } else {
        return [...prevIndexes, index]; // Add index if not already selected
      }
    });

    alert(
      `The title of the card is "${card.name}" and is added for future notification.`
    );

    // Dynamically import the script and execute it
    try {
      const scriptModule = await import("./sendingMail"); // Update path as needed
      scriptModule.default(); // Call the default export function
    } catch (error) {
      console.error("Error loading the script:", error);
    }
  };

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <section className="section top-collection">
        <div className="container">
          <div className="title-wrapper">
            <h2 className="headline-md section-title text-center">
              Latest Collections
            </h2>

            <a href="#" className="btn-link link:hover">
              <span className="span">See More</span>
              <ion-icon name="arrow-forward" aria-hidden="true"></ion-icon>
            </a>
          </div>

          <div className="slider_wrapper">
            <ul className="slider_container">
              <Slider {...settings}>
                {latestCollections?.map((card, index) => (
                  <li className="slider-item" key={index}>
                    <div className="collection-card card">
                      <figure
                        className="card-banner img-holder"
                        onClick={() => handleImageClick(card, index)}
                      >
                        <img
                          src={`https://arweave.net/${card?.Thumbnail}`}
                          width="500"
                          height="500"
                          loading="lazy"
                          alt="Animations Collection"
                          className="img-cover"
                        />
                      </figure>

                      <div className="card-content">
                        <div className="card-profile">
                          {card?.Banner ? (
                            <img
                              src={`https://arweave.net/${card?.Banner}`}
                              width="64"
                              height="64"
                              loading="lazy"
                              alt="CrazyAnyone profile"
                            />
                          ) : (
                            <div style={{ marginTop: "50px" }}></div>
                          )}

                          {selectedIndexes.includes(index) && (
                            <ion-icon
                              name="checkmark-circle"
                              aria-hidden="true"
                              style={{ color: "green", fontSize: "24px" }}
                            ></ion-icon>
                          )}
                        </div>

                        <h3 className="title-md card-title">
                          <a href="#" className="link:hover">
                            {card?.Name}
                          </a>
                        </h3>

                        <p className="label-md card-author">
                          by{" "}
                          <a
                            href="#"
                            className="link"
                            onClick={(e) => {
                              e.preventDefault();
                              if (card?.Creator) {
                                navigator.clipboard
                                  .writeText(card.Creator)
                                  .then(() => alert("Copied to clipboard!"))
                                  .catch((err) =>
                                    console.error("Failed to copy text: ", err)
                                  );
                              }
                            }}
                          >
                            {card?.Creator}
                          </a>
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </Slider>
            </ul>
          </div>

          <a href="#" className="btn-link link:hover">
            <span className="span">See More</span>
            <ion-icon name="arrow-forward" aria-hidden="true"></ion-icon>
          </a>
        </div>
      </section>
    </>
  );
};

export default Collection;
