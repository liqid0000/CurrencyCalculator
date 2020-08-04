import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import RoutingCurrency from './pages/Routing/Routing';

function App() {
  return (    
       <BrowserRouter>   
          <RoutingCurrency/>        
      </BrowserRouter>    
  );
}

export default App;
