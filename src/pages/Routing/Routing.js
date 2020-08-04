import * as React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import *as ROUTES from '../../constants/routes';
import Home from '../Home';
import NotFound from '../NotFound';

const RoutingCurrency = () => {
  
  return (  
      <BrowserRouter>       
          <Switch>
            <Route path={ROUTES.HOME} exact component={Home} />         
            <Route path={ROUTES.NOT_FOUND} component={NotFound} />
          </Switch>      
      </BrowserRouter>   
  );
};

export default RoutingCurrency;
