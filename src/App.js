import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from "@material-ui/core";
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import {BrowserRouter} from "react-router-dom";

import './App.css';
import store from './components/store';
import Router from "./screens/Router";

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: green,
  }
});


function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
           <div className="sendsay-app">
            <Router />
          </div>
       </ThemeProvider>
    </Provider>
</BrowserRouter>
  );
}

export default App;
