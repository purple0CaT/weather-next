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

export const fetchIpLocationWeather = async () => {
  try {
    const url = "https://api.myip.com";
    const resIp = await fetch(url);
    if (resIp.ok) {
      const apiData = await resIp.json();
      // console.log(apiData);
      // fetch ipLocation
      // const url2 = `http://api.ipstack.com/${apiData.ip}?access_key=${process.env.NEXT_PUBLIC_IPAPIKEY}`;
      // const url2 = `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.NEXT_PUBLIC_IPAPIKEY}&ip=${apiData.ip}`;
      const url2 = `https://ipwhois.app/json/${apiData.ip}`;
      const resLocation = await fetch(url2);
      if (resLocation.ok) {
        const dataLocation = await resLocation.json();
        // console.log(dataLocation);
        // fetch Weather
        const weatherUrl = `${process.env.NEXT_PUBLIC_WEATHERURL}/weather?lat=${dataLocation.latitude}&lon=${dataLocation.longitude}&appid=${process.env.NEXT_PUBLIC_WEATHERAPI}`;
        const fetchWeather = await fetch(weatherUrl);
        const weatherData = await fetchWeather.json();
        if (fetchWeather.ok) {
          return weatherData;
        } else {
          // alert("Weather fetch error");
          console.log(fetchWeather);
        }
      } else {
        // alert("Error fetching weather");
        console.log(resLocation);
      }
    } else {
      console.log(resIp);
      // alert("Error fetching ip");
    }
  } catch (error) {
    // alert("Error");
    console.log(error);
  }
};
