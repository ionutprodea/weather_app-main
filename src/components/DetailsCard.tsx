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
      <div
        className="container border rounded mt-5"
        style={{ maxWidth: "800px" }}
      >
        {error && <p>{error}</p>}
        <div className="d-flex justify-content-center mt-3">
          <h2>{LocationName(cityDetails.city)}</h2>
        </div>
        {details && (
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <div className="d-flex justify-content-between">
                <p>Current temperature:</p>
                <p>{details.current.temperature_2m}°C</p>
              </div>
            </li>
            <li className="list-group-item">
              <div className="d-flex justify-content-between">
                <p>Precipitation:</p>
                <p>{details.current.precipitation} %</p>
              </div>
            </li>
            <li className="list-group-item">
              <div className="d-flex justify-content-between">
                <p>Current temperature:</p>
                <p>999°C</p>
              </div>
            </li>
            <li className="list-group-item">
              <div className="d-flex justify-content-between">
                <p>Current temperature:</p>
                <p>999°C</p>
              </div>
            </li>
          </ul>
        )}
      </div>
    </>
  );
};

export default DetailsCard;
