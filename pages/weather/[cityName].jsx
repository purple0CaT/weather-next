import { useRouter } from "next/router";

function CityWeather() {
  const router = useRouter();
  return <div>Specific city {router.query.cityName}</div>;
}

export default CityWeather;
