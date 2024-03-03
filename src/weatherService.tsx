const API_KEY: string = "07ac06a89a99e1d4deadeadc60ace363";

const makeIconURL = (iconId: string): string =>
`https://openweathermap.org/img/wn/${iconId}@2x.png`;

const getFormattedWeatherData = async (city: string, units: string = "metric"): Promise<any> => {
  const URL: string = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

  const data: any = await fetch(URL)
    .then((res: any) => res.json())
    .then((data: any) => data);

  const {
    weather,
    main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
    wind: { speed },
    sys: { country },
    name,
  }: any = data;

  const { description, icon }: any = weather[0];

  return {
    description,
    iconURL: makeIconURL(icon),
    temp,
    feels_like,
    temp_min,
    temp_max,
    pressure,
    humidity,
    speed,
    country,
    name,
  };
};

export { getFormattedWeatherData };