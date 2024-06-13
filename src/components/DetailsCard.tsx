import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";
import { detailsRequest } from "./DetailsRequest";
import LocationName from "./LocationName";
import DailyCard from "./DailyCard";
import { DayName } from "./DayName";

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
      <h2
        className="mt-5 mb-5 px-3 py-2 rounded text-secondary"
        style={{ boxShadow: "0px 0px 7px 0px rgba(0,0,0,0.2)" }}
      >
        {LocationName(cityDetails.city)}
      </h2>
      {error && <p>{error}</p>}
      {details && (
        <div
          className="container border rounded mt-3 mb-3"
          style={{
            maxWidth: "600px",
            boxShadow: "0px 0px 7px 0px rgba(0,0,0,0.2)",
          }}
        >
          <div className="d-flex justify-content-between mt-5">
            <h3 className="ms-3 text-secondary">Current</h3>
            <h3 className="me-3 text-secondary">
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
      {details && (
        <DailyCard
          day={DayName(date.getDay() + 2)}
          minTemp={details.daily.temperature_2m_min[2]}
          maxTemp={details.daily.temperature_2m_max[2]}
          sunRise={details.daily.sunrise[2]}
          sunSet={details.daily.sunset[2]}
          precipitation={details.daily.precipitation_probability_max[2]}
          uvIndex={details.daily.uv_index_max[2]}
          wind={details.daily.wind_speed_10m_max[2]}
          gusts={details.daily.wind_gusts_10m_max[2]}
        />
      )}
      {details && (
        <DailyCard
          day={DayName(date.getDay() + 3)}
          minTemp={details.daily.temperature_2m_min[3]}
          maxTemp={details.daily.temperature_2m_max[3]}
          sunRise={details.daily.sunrise[3]}
          sunSet={details.daily.sunset[3]}
          precipitation={details.daily.precipitation_probability_max[3]}
          uvIndex={details.daily.uv_index_max[3]}
          wind={details.daily.wind_speed_10m_max[3]}
          gusts={details.daily.wind_gusts_10m_max[3]}
        />
      )}
      {details && (
        <DailyCard
          day={DayName(date.getDay() + 4)}
          minTemp={details.daily.temperature_2m_min[4]}
          maxTemp={details.daily.temperature_2m_max[4]}
          sunRise={details.daily.sunrise[4]}
          sunSet={details.daily.sunset[4]}
          precipitation={details.daily.precipitation_probability_max[4]}
          uvIndex={details.daily.uv_index_max[3]}
          wind={details.daily.wind_speed_10m_max[3]}
          gusts={details.daily.wind_gusts_10m_max[3]}
        />
      )}
      {details && (
        <DailyCard
          day={DayName(date.getDay() + 5)}
          minTemp={details.daily.temperature_2m_min[5]}
          maxTemp={details.daily.temperature_2m_max[5]}
          sunRise={details.daily.sunrise[5]}
          sunSet={details.daily.sunset[5]}
          precipitation={details.daily.precipitation_probability_max[5]}
          uvIndex={details.daily.uv_index_max[5]}
          wind={details.daily.wind_speed_10m_max[5]}
          gusts={details.daily.wind_gusts_10m_max[5]}
        />
      )}
      {details && (
        <DailyCard
          day={DayName(date.getDay() + 6)}
          minTemp={details.daily.temperature_2m_min[6]}
          maxTemp={details.daily.temperature_2m_max[6]}
          sunRise={details.daily.sunrise[6]}
          sunSet={details.daily.sunset[6]}
          precipitation={details.daily.precipitation_probability_max[6]}
          uvIndex={details.daily.uv_index_max[6]}
          wind={details.daily.wind_speed_10m_max[6]}
          gusts={details.daily.wind_gusts_10m_max[6]}
        />
      )}
    </>
  );
};

export default DetailsCard;
