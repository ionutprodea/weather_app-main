import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";
import { detailsRequest } from "./DetailsRequest";
import LocationName from "./LocationName";
import DailyCard from "./DailyCard";

interface selectedCoordinates {
  latitude: string;
  longitude: string;
  city: string;
}

interface Props {
  cityDetails: selectedCoordinates;
}

const DetailsCard = ({ cityDetails }: Props) => {
  const [error, setError] = useState("");
  const [details, setDetails] = useState<any>(null);
  useEffect(() => {
    const controller = new AbortController();
    axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${cityDetails.latitude}&longitude=${cityDetails.longitude}&${detailsRequest}`,
        { signal: controller.signal }
      )
      .then((response) => {
        console.log(response);
        setDetails(response.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });
    return () => controller.abort();
  }, [cityDetails]);

  return (
    <>
      <h2 className="fw-normal mt-5">{LocationName(cityDetails.city)}</h2>
      {error && <p>{error}</p>}
      {details && (
        <div
          className="container border rounded mt-3 mb-3"
          style={{ maxWidth: "600px" }}
        >
          <div className="d-flex justify-content-between mt-5">
            <h3 className="fw-normal ms-3">Current</h3>
            <h3 className="fw-normal me-3">
              {details.current.temperature_2m}°C
            </h3>
          </div>
          <ul className="list-group list-group-flush mt-5">
            <li className="list-group-item">
              <div className="d-flex justify-content-between">
                <p>Real Feel:</p>
                <p>{details.current.apparent_temperature}° C</p>
              </div>
            </li>
            <li className="list-group-item">
              <div className="d-flex justify-content-between">
                <p>Precipitation:</p>
                <p>{details.current.precipitation}%</p>
              </div>
            </li>
            <li className="list-group-item">
              <div className="d-flex justify-content-between">
                <p>Humidity:</p>
                <p>{details.current.relative_humidity_2m}%</p>
              </div>
            </li>
            <li className="list-group-item">
              <div className="d-flex justify-content-between">
                <p>Pressure:</p>
                <p>{details.current.surface_pressure} mb</p>
              </div>
            </li>
            <li className="list-group-item">
              <div className="d-flex justify-content-between">
                <p>UV Index:</p>
                <p>{Math.round(details.hourly.uv_index[0])}</p>
              </div>
            </li>
            <li className="list-group-item">
              <div className="d-flex justify-content-between">
                <p>Wind:</p>
                <p>{details.current.wind_speed_10m} km/h</p>
              </div>
            </li>
            <li className="list-group-item">
              <div className="d-flex justify-content-between">
                <p>Wind Gusts:</p>
                <p>{details.current.wind_gusts_10m} km/h</p>
              </div>
            </li>
            <li className="list-group-item">
              <div className="d-flex justify-content-between">
                <p>Cloud Cover:</p>
                <p>{details.current.cloud_cover}%</p>
              </div>
            </li>
          </ul>
        </div>
      )}
      {details && (
        <DailyCard
          day={"Today"}
          minTemp={details.daily.temperature_2m_min[0]}
          maxTemp={details.daily.temperature_2m_max[0]}
          sunRise={details.daily.sunrise[0]}
          sunSet={details.daily.sunset[0]}
          precipitation={details.daily.precipitation_probability_max[0]}
          uvIndex={details.daily.uv_index_max[0]}
          wind={details.daily.wind_speed_10m_max[0]}
          gusts={details.daily.wind_gusts_10m_max[0]}
        />
      )}
      {details && (
        <DailyCard
          day={"Tomorrow"}
          minTemp={details.daily.temperature_2m_min[1]}
          maxTemp={details.daily.temperature_2m_max[1]}
          sunRise={details.daily.sunrise[1]}
          sunSet={details.daily.sunset[1]}
          precipitation={details.daily.precipitation_probability_max[1]}
          uvIndex={details.daily.uv_index_max[1]}
          wind={details.daily.wind_speed_10m_max[1]}
          gusts={details.daily.wind_gusts_10m_max[1]}
        />
      )}
    </>
  );
};

export default DetailsCard;
