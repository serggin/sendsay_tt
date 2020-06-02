import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import logo from '../assets/logo.png';

const useStyles = makeStyles(theme => ({
  root: {}
}));


const Logo = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <img className={classes.logoImg} src={logo} alt="Logo"/>
    </div>
  );
}

export default Logo;
