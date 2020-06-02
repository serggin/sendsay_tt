import React from 'react';
import {useSelector} from "react-redux";
import {Route, Redirect} from "react-router";

import Login from "./Login";
import Console from "./Console";

const Router = () => {
  const screen = useSelector(state => state.screen);
  console.log('screen=', screen);

/*
  return (
    <React.Fragment>
      {screen === 'LOGIN' && <Login />}
      {screen === 'CONSOLE' && <Console />}
    </React.Fragment>
  );
*/
  return (
    <React.Fragment>
      {/*      {screen === 'LOGIN' && <Redirect to="/" />}
      {screen === 'CONSOLE' && <Redirect to="/console" />} */}

      <Route exact path="/" component={Login} />
      <Route path="/console" component={Console} />
    </React.Fragment>
  );

};

export default Router;
