import React from 'react';
import MicroComponents from './Components';
import DataTable from './DataTable';

import { Router } from "@reach/router";

export default () => {
    return <Router primary={false}>
        <MicroComponents path="/" />
        <DataTable path="/table" />
        {/*<NotFound default />*/}
    </Router>
}