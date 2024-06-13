import {
  IoSunnyOutline,
  IoPartlySunnyOutline,
  IoCloudyOutline,
  IoRainyOutline,
  IoSnowOutline,
  IoMoonOutline,
} from "react-icons/io5";

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
  if (is_day) {
    if (rain || showers) return <IoRainyOutline />;
    if (snowfall) return <IoSnowOutline />;
    if (cloud_cover < 20) return <IoSunnyOutline />;
    if (cloud_cover < 65) return <IoPartlySunnyOutline />;
    return <IoCloudyOutline />;
  }

  if (!is_day) {
    if (rain || showers) return <IoRainyOutline />;
    if (snowfall) return <IoSnowOutline />;
    if (cloud_cover < 40) return <IoMoonOutline />;
    return <IoCloudyOutline />;
  }
};

export default WeatherIcon;
