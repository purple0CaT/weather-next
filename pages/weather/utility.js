export const fetchWeather = async ({ cityName }) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_WEATHERURL}/weather?q=${cityName}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHERAPI}`;
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) {
      throw Error("Error");
    }
    //
    const urlForecast = `${process.env.NEXT_PUBLIC_WEATHERURL}/forecast?q=${cityName}&units=metric&exclude=daily&appid=${process.env.NEXT_PUBLIC_WEATHERAPI}`;
    const resFor = await fetch(urlForecast);
    const multipData = await resFor.json();
    if (!resFor.ok) {
      throw Error("Error");
    }
    return { data, multipData };
  } catch (error) {
    console.log(error);
  }
};
