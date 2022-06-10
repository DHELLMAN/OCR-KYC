import reportWebVitals from './reportWebVitals';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {createRoot} from 'react-dom/client';

var React = require("react");
//var ReactDOM = require('react-dom');

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);


root.render(
<BrowserRouter>
    <App/>
</BrowserRouter>
);

reportWebVitals();
