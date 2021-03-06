export const fetchWeather = async ({ cityName, cord }) => {
  try {
    const url =
      cityName === "null"
        ? `${process.env.NEXT_PUBLIC_WEATHERURL}/weather?lat=${cord[0]}&lon=${cord[1]}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHERAPI}`
        : `${process.env.NEXT_PUBLIC_WEATHERURL}/weather?q=${cityName}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHERAPI}`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(url);
    if (!res.ok) {
      throw Error("Error");
    }
    //
    const urlForecast =
      cityName === "null"
        ? `${process.env.NEXT_PUBLIC_WEATHERURL}/forecast?lat=${cord[0]}&lon=${cord[1]}&units=metric&exclude=daily&appid=${process.env.NEXT_PUBLIC_WEATHERAPI}`
        : `${process.env.NEXT_PUBLIC_WEATHERURL}/forecast?q=${cityName}&units=metric&exclude=daily&appid=${process.env.NEXT_PUBLIC_WEATHERAPI}`;
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

export const fetchIpLocationWeather = async () => {
  try {
    const url = "https://api.my-ip.io/ip.json";
    const resIp = await fetch(url);
    if (resIp.ok) {
      const apiData = await resIp.json();
      // fetch ipLocation
      const url2 = `https://api.ip2loc.com/${process.env.NEXT_PUBLIC_LOCATIONAPIKEY}/${apiData.ip}?include=city,location_latitude,location_longitude`;
      const resLocation = await fetch(url2);
      if (resLocation.ok) {
        const dataLocation = await resLocation.json();
        // fetch Weather
        const weatherUrl = `${process.env.NEXT_PUBLIC_WEATHERURL}/weather?lat=${dataLocation.location_latitude}&lon=${dataLocation.location_longitude}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHERAPI}`;
        const fetchWeather = await fetch(weatherUrl);
        const weatherData = await fetchWeather.json();
        if (fetchWeather.ok) {
          return weatherData;
        } else {
          alert("Weather fetch error");
          console.log(fetchWeather);
        }
      } else {
        alert("Error fetching location");
        console.log(resLocation);
      }
    } else {
      console.log(resIp);
      alert("Error fetching ip");
    }
  } catch (error) {
    // alert("Error");
    console.log(error);
  }
};
