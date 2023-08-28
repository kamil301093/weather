const Hourly = (props: { time: string, icon: string, tempC: number, tempF: number, text: string }) => {

    const getHourAndDate = (timeString: string) => {
        const hourAndDate = timeString.split(" ");
        return hourAndDate;
    }

    const hour = getHourAndDate(props.time)[1];

    return (
        <div className="hourly__wrapper">
            <div className="hourly__info">
                <div className="hourly__hour">
                    {hour}
                </div>
                <img className="hourly__icon" src={props.icon} alt={props.text} />
                <div className="hourly__temp">
                    {props.tempC + " C (" + props.tempF + " F)"}
                </div>
                <div className="hourly__text">
                    {props.text}
                </div>
            </div>
            <hr className="hourly__hr" />
        </div>
    )
}

export default Hourly;