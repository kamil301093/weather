import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons/faClock';
import { faEarthAfrica } from '@fortawesome/free-solid-svg-icons/faEarthAfrica';

const Info = (props: { title:string; city: string, icon: string, header: string, region:string, country:string, localtime:string, timezone:string, lastupdate: string, timeOfDay: number, tempC: number, tempF: number, feelslikeC: number, feelslikeF: number, cloud: number, uv: number, windDir: number, windMph: number, windKph: number, humidity: number, pressureM: number, pressureI: number }) => {

        const dayOrNight = props.timeOfDay;

        return (
                <div className="info">
                        <h2 className="info__city">{props.city}</h2>
                        <div className="info__row">
                                <div className="info__panel info__panel--big">
                                        <div>
                                                <img className="info__img" src={props.icon} alt="weather icon" />
                                                {props.header}
                                        </div>
                                        <div>
                                                <h3 className="info__header">{props.tempC + " C (" + props.tempF + " F)"}</h3>
                                        </div>
                                </div>
                        </div>
                        <div className="info__row">
                                <div className="info__panel info__panel--half">
                                        <FontAwesomeIcon icon={faEarthAfrica} size="2xl" />
                                        <div>
                                                {props.region} {props.country}
                                        </div>
                                </div>
                                <div className="info__panel info__panel--half">
                                        <FontAwesomeIcon icon={faClock} size="2xl" />
                                        <div>
                                                localtime {props.localtime}
                                                timzeone {props.timezone}
                                        </div>
                                </div>
                        </div>
                        <h3 className="info__subtitle">{props.title}</h3>
                        <div className="info__row info__row--table">
                                <div className="info__title">last update</div>
                                <div className="info__data">{props.lastupdate}</div>
                        </div>
                        <div className="info__row info__row--table">
                                <div className="info__title">day or night?</div>
                                <div className="info__data">{dayOrNight > 0 ? 'day' : 'night'}</div>
                        </div>
                        <div className="info__row info__row--table">
                                <div className="info__title">feelslike temp</div>
                                <div className="info__data">{props.feelslikeC + " C (" + props.feelslikeF + " F)"}</div>
                        </div>
                        <div className="info__row info__row--table">
                                <div className="info__title">cloud</div>
                                <div className="info__data">{props.cloud + "%"}</div>
                        </div>
                        <div className="info__row info__row--table">
                                <div className="info__title">UV (1-11 scale)</div>
                                <div className="info__data">{props.uv}</div>
                        </div>
                        <div className="info__row info__row--table">
                                <div className="info__title">wind direction</div>
                                <div className="info__data">{props.windDir}</div>
                        </div>
                        <div className="info__row info__row--table">
                                <div className="info__title">wind</div>
                                <div className="info__data">{props.windKph + " kph (" + props.windMph + " mph)"}</div>
                        </div>
                        <div className="info__row info__row--table">
                                <div className="info__title">humidity</div>
                                <div className="info__data">{props.humidity + "%"}</div>
                        </div>
                        <div className="info__row info__row--table">
                                <div className="info__title">pressure</div>
                                <div className="info__data">{props.pressureM + " mb (" + props.pressureI + " in)"}</div>
                        </div>
                </div>
        )
}

export default Info;