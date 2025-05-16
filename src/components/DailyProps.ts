export const dailyProps = (responseData: any, dayNumber: number) => {
  return {
    minTemp: responseData.daily.temperature_2m_min[dayNumber],
    maxTemp: responseData.daily.temperature_2m_max[dayNumber],
    sunRise: responseData.daily.sunrise[dayNumber],
    sunSet: responseData.daily.sunset[dayNumber],
    precipitation: responseData.daily.precipitation_probability_max[dayNumber],
    uvIndex: responseData.daily.uv_index_max[dayNumber],
    wind: responseData.daily.wind_speed_10m_max[dayNumber],
    gusts: responseData.daily.wind_gusts_10m_max[dayNumber],
    rain: responseData.daily.rain_sum[dayNumber],
    cloud_cover: responseData.daily.cloud_cover_mean[dayNumber],
    snow: responseData.daily.snowfall_sum[dayNumber],
  };
};