interface Props {
  day: string;
  minTemp: number;
  maxTemp: number;
  sunRise: any;
  sunSet: any;
  precipitation: number;
  uvIndex: number;
  wind: number;
  gusts: number;
}

const DailyCard = ({
  day,
  minTemp,
  maxTemp,
  sunRise,
  sunSet,
  precipitation,
  uvIndex,
  wind,
  gusts,
}: Props) => {
  return (
    <>
      <div
        className="container border rounded mt-3 mb-3"
        style={{ maxWidth: "700px" }}
      >
        <div className="d-flex justify-content-between mt-5">
          <h3 className="fw-normal ms-3">{day}</h3>
        </div>
        <ul className="list-group list-group-flush mt-5">
          <li className="list-group-item">
            <div className="d-flex justify-content-between">
              <p>Min:</p>
              <p>{minTemp}° C</p>
            </div>
          </li>
          <li className="list-group-item">
            <div className="d-flex justify-content-between">
              <p>Max:</p>
              <p>{maxTemp}° C</p>
            </div>
          </li>
          <li className="list-group-item">
            <div className="d-flex justify-content-between">
              <p>Sunrise:</p>
              <p>{sunRise}</p>
            </div>
          </li>
          <li className="list-group-item">
            <div className="d-flex justify-content-between">
              <p>Sunset:</p>
              <p>{sunSet}</p>
            </div>
          </li>
          <li className="list-group-item">
            <div className="d-flex justify-content-between">
              <p>Precipitation:</p>
              <p>{precipitation}%</p>
            </div>
          </li>
          <li className="list-group-item">
            <div className="d-flex justify-content-between">
              <p>Max UV Index:</p>
              <p>{Math.round(uvIndex)}</p>
            </div>
          </li>
          <li className="list-group-item">
            <div className="d-flex justify-content-between">
              <p>Wind:</p>
              <p>{wind} km/h</p>
            </div>
          </li>
          <li className="list-group-item">
            <div className="d-flex justify-content-between">
              <p>Wind Gusts:</p>
              <p>{gusts} km/h</p>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default DailyCard;
