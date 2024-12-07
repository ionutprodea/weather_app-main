import WeatherIcon from "./WeatherIcon";
import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";
import LocationName from "./LocationName";
import { CurrentWeather } from "./CurrentWeather";

interface Props {
  latitude: string;
  longitude: string;
  city: string;
  onDetailsClick: (latitude: string, longitude: string, city: string) => void;
  detailsVisibility: (details: boolean) => void;
}

const Card = ({
  latitude,
  longitude,
  city,
  onDetailsClick,
  detailsVisibility,
}: Props) => {
  const [currentTemp, setCurrentTemp] = useState(null);
  const [error, setError] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [iconWeather, setIconWeather] = useState<CurrentWeather>();

  const handleOnClick = () => {
    setShowDetails(true);
    detailsVisibility(showDetails);
    onDetailsClick(latitude, longitude, city);
  };

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,is_day,precipitation,rain,showers,snowfall,cloud_cover`,
        { signal: controller.signal }
      )
      .then((result) => {
        console.log(result.data);
        setCurrentTemp(result.data.current.temperature_2m);
        setIconWeather(result.data.current);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    return () => controller.abort();
  }, []);

  return (
    <div className="container" style={{ width: "240px" }}>
      <div
        className="card text-center"
        style={{
          height: "300px",
          boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.2)",
        }}
      >
        {iconWeather && (
          <div
            className="card-img-top mt-5 text-secondary"
            style={{ fontSize: "50px", lineHeight: "0" }}
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
        <div className="card-body d-flex flex-column justify-content-end">
          <h5 className="card-title text-secondary">{LocationName(city)}</h5>
          {error && <p className="card-text">{error}</p>}
          {currentTemp && <p className="card-text">{currentTemp}°C </p>}
          <button
            onClick={handleOnClick}
            type="button"
            className="btn btn-warning mb-3 px-3"
            data-bs-toggle="button"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
