import { IoSunnyOutline } from "react-icons/io5";
import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";
import LocationName from "./LocationName";

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

  const handleOnClick = () => {
    setShowDetails(true);
    detailsVisibility(showDetails);
    onDetailsClick(latitude, longitude, city);
  };

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`,
        { signal: controller.signal }
      )
      .then((result) => {
        setCurrentTemp(result.data.current.temperature_2m);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    return () => controller.abort();
  }, [city]);

  return (
    <div className="container" style={{ width: "240px" }}>
      <div className="card text-center" style={{ height: "300px" }}>
        <IoSunnyOutline
          className="card-img-top mt-5"
          style={{ height: "50px" }}
        />
        <div className="card-body d-flex flex-column justify-content-end">
          <h5 className="card-title">{LocationName(city)}</h5>
          {error && <p className="card-text">{error}</p>}
          {currentTemp && <p className="card-text">{currentTemp}°C </p>}
          <button
            onClick={handleOnClick}
            type="button"
            className="btn btn-primary mb-3 px-3"
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
