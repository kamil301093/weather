import Item from './Item';

const Result = (props: any) => {
        return (
                <Item onClick={props.coordsFunction}>
                        <span className="searchpanel__city">{props.city}</span>,
                        <span className="searchpanel__country"> {props.country}</span>
                </Item>
        );
};

export default Result;