import React from 'react';
import ReactDOM from 'react-dom';
import { ReactQueryDevtools } from 'react-query-devtools';
import App from './components/App';

ReactDOM.render(
    <React.StrictMode>
        <App/>
        <ReactQueryDevtools initialIsOpen={false} />
    </React.StrictMode>,
    document.getElementById('root')
);
