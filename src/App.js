import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Navigation, Viewport } from './views/layout/Layout';
function App() {
  return (
    <Router>
      <Navigation/>
      <Viewport>

      </Viewport>
    </Router>
  );
}

export default App;
