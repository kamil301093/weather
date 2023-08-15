import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons/faTriangleExclamation';

const NoResults = () => {
        return (
                <div className="no-results">
                        <FontAwesomeIcon icon={faTriangleExclamation} size="2xl" />
                        No results. Check spelling or try another name or enter more characters.
                </div>
        )
}

export default NoResults;