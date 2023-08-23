import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons/faTriangleExclamation';

const NoResults = () => {
        return (
                <div className="noresults">
                        <div className="noresults__icon-wrapper">
                                <FontAwesomeIcon icon={faTriangleExclamation} size="xl" />
                        </div>
                        <div className="noresults__message">
                        No results. Check spelling or try another name or enter more characters.
                        </div>
                </div>
        )
}

export default NoResults;