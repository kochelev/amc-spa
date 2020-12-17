import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';

const home = () => {
    return (
        <Fragment>
            <div>
                <h1>Home</h1>
            </div>
        </Fragment>
    );
};

export default withRouter(home);