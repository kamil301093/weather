const Hourly = (props: { time: string, icon: string, tempC: number, tempF: number, text: string, rain: number, rainChancePercent: number, snow: number, snowChancePercent: number }) => {

    const getHourAndDate = (timeString: string) => {
        const hourAndDate = timeString.split(" ");
        return hourAndDate;
    }

    const hour = getHourAndDate(props.time)[1];

    const willItRain = (yesOrNow: number) => {
        let chance: string;
        if (yesOrNow == 1) {
            chance = "yes";
        } else {
            chance = "no";
        }
        return chance;
    }

    const rainChance = willItRain(props.rain);
    const snowChance = willItRain(props.snow);

    return (
        <div className="hourly">
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
                    {rainChance + " (" + props.rainChancePercent + "% chance)"}
                </div>
                <div className="hourly__text">
                    {snowChance + " (" + props.snowChancePercent + "% chance)"}
                </div>
            </div>
        </div>
    )
}

export default Hourly;