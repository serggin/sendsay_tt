import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, Paper} from "@material-ui/core";
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: theme.palette.grey["400"],
    borderStyle: "solid",
    borderLeftStyle: "none",
    borderRightStyle: "none",
    padding: 10
  },
  sendButton: {
    textTransform: "none"
  },
  formatButton: {
    textTransform: "none"
  },

}));

export const ActionPanel = ({hasRequest, onSend, onFormat}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        color="primary"
        className={classes.sendButton}
        onClick={onSend}
        disabled={!hasRequest}
      >
        Отправить
      </Button>
      <Button className={classes.formatButton}
              color="primary"
              startIcon={<FormatAlignRightIcon color="primary"/>}
              onClick={onFormat}
              disabled={!hasRequest}
      >
        Форматировать
      </Button>
    </div>
  );
}