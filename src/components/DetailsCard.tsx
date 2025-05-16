import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";
import { detailsRequest } from "./DetailsRequest";
import LocationName from "./LocationName";
import DailyCard from "./DailyCard";
import { DayName } from "./DayName";
import { dailyProps } from "./DailyProps";

interface selectedCoordinates {
  latitude: string;
  longitude: string;
  city: string;
}

interface Props {
  cityDetails: selectedCoordinates;
}

const DetailsCard = ({ cityDetails }: Props) => {
  const date = new Date();
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
      <h2 className="mt-5 mb-5 px-3 py-2 rounded text-dark">
        {LocationName(cityDetails.city)}
      </h2>
      {error && <p>{error}</p>}
      <div className="details-container">
        {details && (
          <div
            className="container border rounded mt-3 mb-3"
            style={{
              width: "320px",
              boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.2)",
              background: "rgba(255,255,255,0.5)",
            }}
          >
            <div className="d-flex justify-content-between mt-5">
              <h3 className="ms-3 text-dark">Current</h3>
              <h3 className="me-3 text-dark">
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
        {details && <DailyCard day={"Today"} {...dailyProps(details, 0)} />}
        {details && <DailyCard day={"Tomorrow"} {...dailyProps(details, 1)} />}
        {details && (
          <DailyCard
            day={DayName(date.getDay() + 2)}
            {...dailyProps(details, 2)}
          />
        )}
        {details && (
          <DailyCard
            day={DayName(date.getDay() + 3)}
            {...dailyProps(details, 3)}
          />
        )}
        {details && (
          <DailyCard
            day={DayName(date.getDay() + 4)}
            {...dailyProps(details, 4)}
          />
        )}
        {details && (
          <DailyCard
            day={DayName(date.getDay() + 5)}
            {...dailyProps(details, 5)}
          />
        )}
        {details && (
          <DailyCard
            day={DayName(date.getDay() + 6)}
            {...dailyProps(details, 6)}
          />
        )}
      </div>
    </>
  );
};

export default DetailsCard;
