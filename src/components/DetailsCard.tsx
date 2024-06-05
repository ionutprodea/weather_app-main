import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";
import { detailsRequest } from "./DetailsRequest";
import LocationName from "./LocationName";

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
      <h2 className="fw-normal mt-5">Current</h2>
      {error && <p>{error}</p>}
      {details && (
        <div
          className="container border rounded mt-3"
          style={{ maxWidth: "700px" }}
        >
          <div className="d-flex justify-content-between mt-5">
            <h3 className="fw-normal ms-3">{LocationName(cityDetails.city)}</h3>
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
                <p>Daily UV Index:</p>
                <p>{Math.round(details.daily.uv_index_max[0])} max</p>
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
    </>
  );
};

export default DetailsCard;
