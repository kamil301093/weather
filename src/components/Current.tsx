import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons/faCircleInfo';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { useState } from 'react';

const Current = (props: { title: string; icon: string, header: string, lastupdate: string, timeOfDay: number, tempC: number, tempF: number, feelslikeC: number, feelslikeF: number, cloud: number, uv: number, windDir: number, windMph: number, windKph: number, humidity: number, pressureM: number, pressureI: number }) => {

        const [showUvWarning, setShowUvWarning] = useState<boolean>(false);

        const dayOrNight = props.timeOfDay;

        const whichWarning = (uvLevel: number) => {
                let warning: string;
                if (uvLevel <= 2) {
                        warning = "low, no danger for the average person";
                } else if (uvLevel > 2 && uvLevel <= 5) {
                        warning = "moderate, stay in shade when the Sun is strongest";
                } else if (uvLevel > 5 && uvLevel <= 7) {
                        warning = "high, protection against skin and eye damage is needed";
                } else if (uvLevel > 7 && uvLevel <= 10) {
                        warning = "very high, take extra precautions because unprotected skin and eyes will be damaged!";
                } else {
                        warning = "extreme, take all precautions because unprotected skin and eyes can burn in minutes!";
                }
                return warning;
        }

        const uvWarning = whichWarning(props.uv);

        const toggleWarning = () => {
                if (showUvWarning == false) {
                        setShowUvWarning(true);
                } else if (showUvWarning == true) {
                        setShowUvWarning(false);
                }
        }

        const closeWarning = () => {
                setShowUvWarning(false);
        }

        return (
                <div className="current__wrapper">
                        <div className="current__info rectangle">
                                <img className="current__img" src={props.icon} alt="weather icon" />
                                <div className="current__text">
                                        <h3 className="current__header">{props.tempC + " C (" + props.tempF + " F)"}</h3>
                                        <h4 className="current__description">{props.header}</h4>
                                </div>
                        </div>
                        <h3 className="current__subtitle">{props.title}</h3>
                        <div className="current__panel rectangle">
                                <div className="current__row">
                                        <div className="current__name">last update</div>
                                        <div className="current__data">{props.lastupdate}</div>
                                </div>
                                <hr className="current__hr" />
                                <div className="current__row">
                                        <div className="current__name">day or night?</div>
                                        <div className="current__data">{dayOrNight > 0 ? 'day' : 'night'}</div>
                                </div>
                                <hr className="current__hr" />
                                <div className="current__row">
                                        <div className="current__name">feelslike temp</div>
                                        <div className="current__data">{props.feelslikeC + " C (" + props.feelslikeF + " F)"}</div>
                                </div>
                                <hr className="current__hr" />
                                <div className="current__row">
                                        <div className="current__name">cloud</div>
                                        <div className="current__data">{props.cloud + "%"}</div>
                                </div>
                                <hr className="current__hr" />
                                <div className="current__row">
                                        <div className="current__name">UV (1-11 scale)</div>
                                        <div className="current__data">
                                                {props.uv}
                                                <FontAwesomeIcon className="current__uv-icon" icon={faCircleInfo} onClick={toggleWarning} />
                                                <div className="current__uv-warning" style={{ visibility: showUvWarning == true ? 'visible' : 'hidden' }}>
                                                        <a className="current__uv-warning-close" onClick={closeWarning}><FontAwesomeIcon icon={faXmark} size="sm" /></a>
                                                        <div className="current__uv-warning-text">{uvWarning}</div>
                                                </div>
                                        </div>
                                </div>
                                <hr className="current__hr" />
                                <div className="current__row">
                                        <div className="current__name">wind direction</div>
                                        <div className="current__data">{props.windDir}</div>
                                </div>
                                <hr className="current__hr" />
                                <div className="current__row">
                                        <div className="current__name">wind</div>
                                        <div className="current__data">{props.windKph + " kph (" + props.windMph + " mph)"}</div>
                                </div>
                                <hr className="current__hr" />
                                <div className="current__row">
                                        <div className="current__name">humidity</div>
                                        <div className="current__data">{props.humidity + "%"}</div>
                                </div>
                                <hr className="current__hr" />
                                <div className="current__row">
                                        <div className="current__name">pressure</div>
                                        <div className="current__data">{props.pressureM + " mb (" + props.pressureI + " in)"}</div>
                                </div>
                        </div>
                </div>
        )
}

export default Current;