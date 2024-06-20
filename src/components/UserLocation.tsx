import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";
import { CurrentWeather } from "./CurrentWeather";
import WeatherIcon from "./WeatherIcon";

interface coords {
  latitude: number;
  longitude: number;
}

const UserLocation = () => {
  const [userIP, setUserIP] = useState(null);
  const [userCoordinates, setUserCoordinates] = useState<coords>();
  const [currentTemp, setCurrentTemp] = useState(null);
  const [iconWeather, setIconWeather] = useState<CurrentWeather>();
  useEffect(() => {
    const controller = new AbortController();
    axios
      .get("https://api.ipify.org?format=json", { signal: controller.signal })
      .then((response) => {
        setUserIP(response.data.ip);
        console.log(response.data.ip);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.log(err);
      });
    return () => controller.abort();
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    axios
      .get(`http://ip-api.com/json/${userIP}`, { signal: controller.signal })
      .then((response) => {
        console.log(response.data),
          setUserCoordinates({
            latitude: response.data.lat,
            longitude: response.data.lon,
          });
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.log(err);
      });
    return () => controller.abort();
  }, [userIP]);
  useEffect(() => {
    if (userIP) {
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
      <div>
        <h2 className="text-light">Logo</h2>
      </div>
      <div className="d-flex justify-content-end">
        <div className="me-2">
          <h2 className="text-light">Your Location</h2>
        </div>
        <div>
          <h2 className="text-light">{currentTemp}°C</h2>
        </div>
        {iconWeather && (
          <div className="text-light">
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
