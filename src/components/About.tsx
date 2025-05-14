import { Link } from "react-router-dom";
import UserLocation from "./UserLocation";
import geoapify_logo from "../images/geoapify_logo.png";
import locationiq_logo from "../images/locationiq_logo.png";
import openmeteo_logo from "../images/openmeteo_logo.png";
import { Helmet } from "react-helmet";

const About = () => {
  const handelClick = () => {
    sessionStorage.setItem("toggleDetails", "");
    sessionStorage.setItem("savedCoordinates", "");
    sessionStorage.setItem("searchResults", "");
  };
  return (
    <>
      <Helmet>
        <title>About SkyCast</title>
        <meta
          name="description"
          content="All you need to know about SkyCast weather forecasting application. How it works and services we use."
        />
        <meta
          name="keywords"
          content="About SkyCast, Reliable Weather Forecasts, Real-time Weather, Accurate Weather Tracking, Meteorological Data"
        />
      </Helmet>
      <div className="content d-flex flex-column justify-content-between">
        <div>
          <UserLocation
            detailsVisibility={() => {}}
            selectedCoordinates={() => {}}
            searchResults={() => {}}
          />
          <div
            className="container d-flex flex-column align-items-center mt-5"
            style={{ maxWidth: "620px" }}
          >
            <h1 className="text-dark mt-5">About Skycast</h1>
            <p className="mt-5 text mx-1">
              Skycast was created as part of my web development portfolio. It
              provides accurate meteorological data using Open-Meteo APIs and
              location services provided by LocationIQ and Geoapify. Please note
              that the APIs are on free usage plans, which means the app has a
              limited number of queries each month. Once this limit is reached,
              new queries cannot be processed until the counter resets.
              Apologies for any inconvenience this may cause and appreciate your
              understanding. If you like this app and would like to know more
              about its creator,{" "}
              <a href="https://ionutprodea.ro/" className="link" target="blank">
                follow this link
              </a>
              .
            </p>
            <h2 className="text-dark mt-5 mb-4">Created with: </h2>
            <div
              className="d-flex flex-row flex-wrap justify-content-evenly"
              style={{ maxWidth: "620px" }}
            >
              <a
                href="https://www.geoapify.com/"
                target="blank"
                className="m-3"
              >
                <img src={geoapify_logo} alt="geoapify logo" />
              </a>
              <a href="https://locationiq.com/" target="blank" className="m-3">
                <img src={locationiq_logo} alt="locationiq logo" />
              </a>
              <a href="https://open-meteo.com/" className="m-3">
                <img src={openmeteo_logo} alt="open meteo logo" />
              </a>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column align-items-center bg-dark py-2 mt-3">
          <Link to={"/"} onClick={handelClick} className="link">
            <h4 className="text-light">Home</h4>
          </Link>
        </div>
      </div>
    </>
  );
};

export default About;
