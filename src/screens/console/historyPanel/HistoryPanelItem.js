import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import {IconButton, TextField, Typography} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FullscreenIcon from "@material-ui/icons/Fullscreen";

const useStyles = makeStyles(theme => ({
  root: {
    ///width: "100%",
    //height: "100%",
    //display: "flex",
    padding: 5,
    paddingLeft: 10,
    marginRight: 10,
    backgroundColor: "white",
    borderRadius: 5,
    //height: ""
    //boxSizing: "border-box"
  },
  circle: {
    display: "inline-block",
    width: 10,
    height: 10,
    marginRight: 5,
    borderRadius: "50%",
    backgroundColor: "green"
  },
  circleError: {
    backgroundColor: "red"
  },
  button: {
    padding: 0
  }
}));

const Cicle = ({hasError}) => {
  const classes = useStyles();

  const classNames = `${classes.circle} ${hasError ? classes.circleError : ""}`;
  return (
    <div className={classNames}></div>
  );
}

const MoreButton = () => {
  const classes = useStyles();
  return (
    <IconButton className={classes.button}>
      <MoreVertIcon />
    </IconButton>
  );
}


export const HistoryPanelItem = ({hasError, action, key}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Cicle hasError={hasError} />
      <span>{action}</span>
      <MoreButton />
    </div>
  );
}
