const Nothing = (props: {nothingFunction:any}) => {
    return (
        <div className="nothing">
            Nothing to show. Type city name or use <a onClick={props.nothingFunction}>geolocation.</a>
        </div>
    )
}

export default Nothing;