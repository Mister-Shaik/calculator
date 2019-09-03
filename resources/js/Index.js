import React from 'react';
import ReactDOM from 'react-dom';
import Calc from './Calc';
import PdfGen from './PdfGen';
import {BrowserRouter as Router} from 'react-router-dom';

if (document.getElementById('home')) {
    ReactDOM.render(<Router><Calc /></Router>, document.getElementById('home'));
}