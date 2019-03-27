import React from 'react';
import ReactDOM from 'react-dom';

import './static/index.css';
import Theme from './Theme';
import App from './App';

const Root = () => (
  <Theme>
    <App />
  </Theme>
);

ReactDOM.render(Root() , document.getElementById('root'));
