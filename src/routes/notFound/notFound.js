import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';

const notFound = () => {
    return (
        <Fragment>
            <div>
                <h1>404</h1>
            </div>
        </Fragment>
    );
};

export default withRouter(notFound);