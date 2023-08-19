const Info = (props: { title: string; icon: string, header: string, lastupdate: string, timeOfDay: number, tempC: number, tempF: number, feelslikeC: number, feelslikeF: number, cloud: number, uv: number, windDir: number, windMph: number, windKph: number, humidity: number, pressureM: number, pressureI: number }) => {

        const dayOrNight = props.timeOfDay;

        const showWarning = (uvLevel:number) => {
                let warning:string;
                if (uvLevel <= 2) {
                        warning = "low, no danger";
                } else if (uvLevel > 2 && uvLevel <= 5) {
                        warning = "moderate, stay in shade when the Sun is strongest";
                } else if (uvLevel > 5 && uvLevel <= 7) {
                        warning = "high, risk of harm from unprotected sun exposure";
                } else if (uvLevel > 7 && uvLevel <= 10) {
                        warning = "very high, very high risk of harm from unprotected sun exposure";
                } else {
                        warning = "extreme, extreme risk of harm from unprotected sun exposure!";
                }
                return warning;
        }

        const uvWarning = showWarning(props.uv);

        return (
                <div className="info">
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
                                <div className="info__data">{props.uv + " (" + uvWarning + ")"}</div>
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