import rainIcon from "../images/icons/rain.webp";
import snowIcon from "../images/icons/snow.webp";
import sunnyIcon from "../images/icons/sunny.webp";
import partSunnyIcon from "../images/icons/part-sunny.webp";
import cloudyIcon from "../images/icons/cloudy.webp";
import moonIcon from "../images/icons/moon.webp";
import partMoonIcon from "../images/icons/part-moon.webp";

interface Props {
  cloud_cover: number;
  is_day: number;
  rain: number;
  showers: number;
  snowfall: number;
}

const WeatherIcon = ({
  cloud_cover,
  is_day,
  rain,
  showers,
  snowfall,
}: Props) => {
  let imagePath = "";
  if (is_day) {
    if (rain || showers) imagePath = rainIcon;
    else if (snowfall) imagePath = snowIcon;
    else if (cloud_cover < 35) imagePath = sunnyIcon;
    else if (cloud_cover < 89) imagePath = partSunnyIcon;
    else imagePath = cloudyIcon;
  }

  if (!is_day) {
    if (rain || showers) imagePath = rainIcon;
    else if (snowfall) imagePath = snowIcon;
    else if (cloud_cover < 35) imagePath = moonIcon;
    else if (cloud_cover < 89) imagePath = partMoonIcon;
    else imagePath = cloudyIcon;
  }

  return <img src={imagePath} alt="weather icon" />;
};

export default WeatherIcon;
