const Nothing = (props: {nothingFunction:any}) => {
    return (
        <div className="nothing">
            Nothing to show. Type city name or use <a className="nothing__link" onClick={props.nothingFunction}>geolocation.</a>
        </div>
    )
}

export default Nothing;