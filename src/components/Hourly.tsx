const Hourly = (props: { time: string, icon: string, tempC: number, tempF: number, text: string, chanceRain: number, chanceSnow: number }) => {

    const getHourAndDate = (timeString: string) => {
        const hourAndDate = timeString.split(" ");
        return hourAndDate;
    }

    const date = getHourAndDate(props.time)[0];
    const hour = getHourAndDate(props.time)[1];

    return (
        <div className="hourly">
            <h3 className="hourly__header">Hour by hour {date}</h3>
            <div className="hourly__hour">
                {hour}
            </div>
            <div className="hourly__icon">
                {props.icon}
            </div>
            <div className="hourly__temp">
                {props.tempC + " C (" + props.tempF + " F)"}
                <div className="hourly__text">
                    {props.text}
                </div>
                <div className="hourly__text">
                    {props.chanceRain}
                </div>
                <div className="hourly__text">
                    {props.chanceSnow}
                </div>
            </div>
        </div>
    )
}

export default Hourly;