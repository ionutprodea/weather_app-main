import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";
import { CurrentWeather } from "./CurrentWeather";
import WeatherIcon from "./WeatherIcon";
import Logo from "../images/skycast_logo.png";
import { Link } from "react-router-dom";

interface coords {
  latitude: number;
  longitude: number;
}

interface Props {
  detailsVisibility: (details: boolean) => void;
  selectedCoordinates: (display: null) => void;
  searchResults: (arr: []) => void;
}

const UserLocation = ({
  detailsVisibility,
  selectedCoordinates,
  searchResults,
}: Props) => {
  const handleClick = () => {
    detailsVisibility(false);
    selectedCoordinates(null);
    searchResults([]);
    sessionStorage.setItem("savedCoordinates", "");
    sessionStorage.setItem("searchResults", "");
  };
  const [userCoordinates, setUserCoordinates] = useState<coords>();
  const [currentTemp, setCurrentTemp] = useState(null);
  const [iconWeather, setIconWeather] = useState<CurrentWeather>();
  useEffect(() => {
    const controller = new AbortController();
    axios
      .get(
        "https://api.geoapify.com/v1/ipinfo?&apiKey=6d645c5465934074974eeef9d0519e01",
        { signal: controller.signal }
      )
      .then((response) => {
        setUserCoordinates({
          latitude: response.data.location.latitude,
          longitude: response.data.location.longitude,
        });
        console.log(response.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.log(err);
      });
    return () => controller.abort();
  }, []);
  useEffect(() => {
    if (userCoordinates) {
      const controller = new AbortController();
      axios
        .get(
          `https://api.open-meteo.com/v1/forecast?latitude=${userCoordinates?.latitude}&longitude=${userCoordinates?.longitude}&current=temperature_2m,is_day,precipitation,rain,showers,snowfall,cloud_cover`,
          { signal: controller.signal }
        )
        .then((result) => {
          console.log(result.data);
          setCurrentTemp(result.data.current.temperature_2m);
          setIconWeather(result.data.current);
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          console.log(err);
        });
      return () => controller.abort();
    }
  }, [userCoordinates]);
  return (
    <div className="d-flex justify-content-evenly bg-dark pt-3 pb-1">
      <h1 className="d-none">Weather Forecast</h1>
      <div className="ms-2">
        <h2>
          <Link to={"/"} onClick={handleClick}>
            <img
              src={Logo}
              alt="skycast logo"
              style={{ height: "35px" }}
              className="logo"
            />
          </Link>
        </h2>
      </div>
      <div className="d-flex justify-content-end">
        <div className="me-2">
          <h2 className="text-light your_location">Your Location</h2>
        </div>
        <h2 className="text-light">{currentTemp}°C</h2>
        {iconWeather && (
          <div
            className="text-light ms-3 me-2 icon"
            style={{ lineHeight: "0" }}
          >
            <WeatherIcon
              cloud_cover={iconWeather?.cloud_cover}
              is_day={iconWeather?.is_day}
              rain={iconWeather?.rain}
              showers={iconWeather?.showers}
              snowfall={iconWeather?.snowfall}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserLocation;
