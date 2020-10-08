import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Navigation, Viewport, LayoutContainer } from 'views/layout/';

import Routing from 'routing/Root';

function App() {
  return (
    <Router>
      <LayoutContainer>
        <Viewport>
          <Routing/>
        </Viewport>
      </LayoutContainer>
    </Router>
  );
}

export default App;
