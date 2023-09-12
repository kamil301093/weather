import { useState, useEffect } from "react";
import Result from './Result';
import Current from './Current';
import Forecast from './Forecast';
import Hourly from './Hourly';
import Loading from './Loading';
import NoResults from './NoResults';
import Nothing from './Nothing';
import Geolocation from './Geolocation';
import Map from './Map';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons/faX';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';

const Main = () => {

  const [cities, setCities] = useState([]);
  const [citiesResults, setCitiesResults] = useState<any>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [showDeleteKeywordButton, setShowDeleteKeywordButton] = useState<boolean>(false);
  const [coordinates, setCoordinates] = useState<any>("");
  const [weatherData, setWeatherData] = useState<any>([]);
  const [currentWeatherDiv, setCurrentWeatherDiv] = useState<any>();
  const [forecastWeatherDiv, setForecastWeatherDiv] = useState<any>();
  const [forecastDay, setForecastDay] = useState<number>(0);
  const [showPrevButton, setShowPrevButton] = useState<boolean>(false);
  const [showNextButton, setShowNextButton] = useState<boolean>(false);
  const [hoursDiv, setHoursDiv] = useState<any>();
  const [mapCoords, setMapCoords] = useState<any>();
  const [mapDiv, setMapDiv] = useState<any>();

  const handleChange = (e: any) => {
    let value = e.target.value;
    setKeyword(value);
  }

  const getCoords = (lt: any, ln: any) => {
    const ltPlusLn = '' + lt + ',' + ln + '';
    setCoordinates(ltPlusLn);
    removeKeyword();
    setForecastDay(0);
  }

  const removeKeyword = () => {
    setKeyword("");
  }

  useEffect(() => {
    if (keyword.length > 0) {
      setCitiesResults(<Loading />);
      setShowDeleteKeywordButton(true);
      let url = 'http://api.weatherapi.com/v1/search.json?key=cfb427d15f6e4de9951181216232004&q=' + keyword;
      fetch(url)
        .then(response => {
          return response.json()
        })
        .then(data => {
          setCities(data);
        })
    } else {
      setCitiesResults("");
      setShowDeleteKeywordButton(false);
    }
  }, [keyword]);

  useEffect(() => {
    if (keyword.length > 0) {
      if (cities.length > 0) {
        setCitiesResults(cities.map((ct: any) => (<Result city={ct.name} country={ct.country} coordsFunction={() => getCoords(ct.lat, ct.lon)} />)));
      } else {
        setCitiesResults(<NoResults />);
      }
    } else {
      setCitiesResults("");
    }
  }, [cities]);

  useEffect(() => {
    if (coordinates !== "") {
      let url = 'http://api.weatherapi.com/v1/forecast.json?key=cfb427d15f6e4de9951181216232004&q=' + coordinates + '&days=3';
      fetch(url)
        .then(response => {
          return response.json()
        })
        .then(data => {
          setWeatherData(data);
        });
      setMapCoords(coordinates);
    }
  }, [coordinates]);

  useEffect(() => {
    console.log(weatherData)
    if (weatherData === "" || weatherData === "undefined" || weatherData.length === 0) {
      setCurrentWeatherDiv(<Nothing nothingFunction={locMe} />);
    } else {
      setShowNextButton(true);
      setCurrentWeatherDiv(
        <Current
          title={"Current weather"}
          city={weatherData.location.name}
          region={weatherData.location.region}
          country={weatherData.location.country}
          localtime={weatherData.location.localtime}
          timezone={weatherData.location.tz_id}
          icon={weatherData.current.condition.icon}
          header={weatherData.current.condition.text}
          lastupdate={weatherData.current.last_updated}
          timeOfDay={weatherData.current.is_day}
          tempC={weatherData.current.temp_c}
          tempF={weatherData.current.temp_f}
          feelslikeC={weatherData.current.feelslike_c}
          feelslikeF={weatherData.current.feelslike_f}
          cloud={weatherData.current.cloud}
          uv={weatherData.current.uv}
          windDir={weatherData.current.wind_dir}
          windMph={weatherData.current.wind_mph}
          windKph={weatherData.current.wind_kph}
          humidity={weatherData.current.humidity}
          pressureM={weatherData.current.pressure_mb}
          pressureI={weatherData.current.pressure_in}
        />);
      setForecastWeatherDiv(
        <Forecast
          title={"Forecast"}
          date={weatherData.forecast.forecastday[0].date}
          icon={weatherData.forecast.forecastday[0].day.condition.icon}
          header={weatherData.forecast.forecastday[0].day.condition.text}
          maxTempC={weatherData.forecast.forecastday[0].day.maxtemp_c}
          maxTempF={weatherData.forecast.forecastday[0].day.maxtemp_f}
          minTempC={weatherData.forecast.forecastday[0].day.mintemp_c}
          minTempF={weatherData.forecast.forecastday[0].day.mintemp_f}
          avgTempC={weatherData.forecast.forecastday[0].day.avgtemp_c}
          avgTempF={weatherData.forecast.forecastday[0].day.avgtemp_f}
          maxWindMph={weatherData.forecast.forecastday[0].day.maxwind_mph}
          maxWindKph={weatherData.forecast.forecastday[0].day.maxwind_kph}
          rain={weatherData.forecast.forecastday[0].day.daily_will_it_rain}
          rainChancePercent={weatherData.forecast.forecastday[0].day.daily_chance_of_rain}
          snow={weatherData.forecast.forecastday[0].day.daily_will_it_snow}
          snowChancePercent={weatherData.forecast.forecastday[0].day.daily_chance_of_snow}
          avgHumidity={weatherData.forecast.forecastday[0].day.avghumidity}
          uv={weatherData.forecast.forecastday[0].day.uv}
          sunrise={weatherData.forecast.forecastday[0].astro.sunrise}
          sunset={weatherData.forecast.forecastday[0].astro.sunset}
        />);
      setHoursDiv(weatherData.forecast.forecastday[0].hour.map((data: any) => (
        <Hourly
          time={data.time}
          icon={data.condition.icon}
          tempC={data.temp_c}
          tempF={data.temp_f}
          text={data.condition.text}
        />)));
    }
  }, [weatherData]);

  useEffect(() => {
    if (mapCoords != undefined) {
      setMapDiv(<Map mapCoords={coordinates} />);
    } else {
      setMapDiv("");
    }
  }, [mapCoords]);

  const locMe = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      const ltPlusLn = '' + position.coords.latitude + ',' + position.coords.longitude + '';
      setCoordinates(ltPlusLn);
    });
  }

  useEffect(() => {
    if (weatherData.forecast === "" || weatherData.forecast === undefined || weatherData.forecast.length === 0) {
      setForecastWeatherDiv("");
      setHoursDiv("")
    } else {
      setForecastWeatherDiv(
        <Forecast
          title={"Forecast"}
          date={weatherData.forecast.forecastday[forecastDay].date}
          icon={weatherData.forecast.forecastday[forecastDay].day.condition.icon}
          header={weatherData.forecast.forecastday[forecastDay].day.condition.text}
          maxTempC={weatherData.forecast.forecastday[forecastDay].day.maxtemp_c}
          maxTempF={weatherData.forecast.forecastday[forecastDay].day.maxtemp_f}
          minTempC={weatherData.forecast.forecastday[forecastDay].day.mintemp_c}
          minTempF={weatherData.forecast.forecastday[forecastDay].day.mintemp_f}
          avgTempC={weatherData.forecast.forecastday[forecastDay].day.avgtemp_c}
          avgTempF={weatherData.forecast.forecastday[forecastDay].day.avgtemp_f}
          maxWindMph={weatherData.forecast.forecastday[forecastDay].day.maxwind_mph}
          maxWindKph={weatherData.forecast.forecastday[forecastDay].day.maxwind_kph}
          rain={weatherData.forecast.forecastday[forecastDay].day.daily_will_it_rain}
          rainChancePercent={weatherData.forecast.forecastday[forecastDay].day.daily_chance_of_rain}
          snow={weatherData.forecast.forecastday[forecastDay].day.daily_will_it_snow}
          snowChancePercent={weatherData.forecast.forecastday[forecastDay].day.daily_chance_of_snow}
          avgHumidity={weatherData.forecast.forecastday[forecastDay].day.avghumidity}
          uv={weatherData.forecast.forecastday[forecastDay].day.uv}
          sunrise={weatherData.forecast.forecastday[forecastDay].astro.sunrise}
          sunset={weatherData.forecast.forecastday[forecastDay].astro.sunset}
        />);
      setHoursDiv(weatherData.forecast.forecastday[forecastDay].hour.map((data: any) => (
        <Hourly
          time={data.time}
          icon={data.condition.icon}
          tempC={data.temp_c}
          tempF={data.temp_f}
          text={data.condition.text}
        />)));
      if (forecastDay === 2) {
        setShowPrevButton(true);
        setShowNextButton(false);
      } else if (forecastDay === 1) {
        setShowPrevButton(true);
        setShowNextButton(true);
      } else if (forecastDay === 0) {
        setShowPrevButton(false);
        setShowNextButton(true);
      }
    }
  }, [forecastDay]);

  return (
    <div className="main">
      <div className="searchpanel">
        <div className="searchpanel__left">
          <input className="rectangle searchpanel__input" type="text" placeholder="Insert city name here" value={keyword} onChange={handleChange} />
          <FontAwesomeIcon className="searchpanel__delete" icon={faX} onClick={removeKeyword} style={{ display: showDeleteKeywordButton == true ? 'inline-block' : 'none' }} />
        </div>
        <div className="searchpanel__right">
          <Geolocation locFunction={locMe} />
        </div>
      </div>
      <div className="results">{citiesResults}</div>
      <div className="current">{currentWeatherDiv}</div>
      <div className="forecast">
        <div className="forecast__nav">
          <a className="forecast__navarrow" onClick={() => setForecastDay(forecastDay - 1)} style={{ visibility: showPrevButton == true ? 'visible' : 'hidden' }}><FontAwesomeIcon icon={faChevronLeft} /></a>
          <a className="forecast__navarrow" onClick={() => setForecastDay(forecastDay + 1)} style={{ visibility: showNextButton == true ? 'visible' : 'hidden' }}><FontAwesomeIcon icon={faChevronRight} /></a>
        </div>
        {forecastWeatherDiv}
      </div>
      <div className="hourly rectangle">{hoursDiv}</div>
      <div className="map">{mapDiv}</div>
    </div>
  );

}
export default Main;