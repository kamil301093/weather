const Result = (props: any) => {
        return (
                <a className="results__item" onClick={props.coordsFunction}>
                        <span className="results__city">{props.city}, </span>
                        <span className="results__country">{props.country}</span>
                        <hr className="results__hr" />
                </a>
        );
};

export default Result; 