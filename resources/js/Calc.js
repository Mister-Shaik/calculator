import React from 'react';
import {Route} from 'react-router-dom';
import Home from './Components/Home';
import Reports from './Components/Reports';
import Calculation from './Components/Calculation';
import pdfGen from './PdfGen';
import 'tachyons';

function Calc() {
  return (
    <div>
        <ul className="nav justify-content-center bg-blue">
          <li className="nav-item">
            <p className="nav-link white f4 ma0 pa2">CALCULATOR</p>
          </li>
        </ul>
        <div>
              <Route exact path = "/" component={Home} />
              <Route path = "/calc" component={Calculation} />
              <Route path = "/reports" component={Reports} />
              <Route path = "/pdfgen" component={pdfGen} />

        </div>
    </div>
  );
}

export default Calc;
