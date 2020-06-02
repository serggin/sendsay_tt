import React, { useEffect, useState } from 'react';
import {useSelector} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';

import {HistoryPanelItem} from './historyPanel/HistoryPanelItem';

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexBasis: 54,
    alignItems: "center",
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,

    backgroundColor: theme.palette.grey["200"],
    borderWidth: 1,
    borderColor: theme.palette.grey["400"],
    borderStyle: "solid",
    borderLeftStyle: "none",
    borderRightStyle: "none",
  },

}));

export const HistoryPanel = (onCommand) => {
  const classes = useStyles();
  const requestHistory = useSelector(state => state.requestHistory);

  const onItemCommand = (command, hash) => {
    // to be continued
  }

  return (
    <div className={classes.root}>
      {requestHistory.history.map(item => {
        const action = JSON.parse(item.request).action;
        return (
          <HistoryPanelItem hasError={item.hasError}
                            action={action}
                            key={item.hash}
                            onItemCommand={onItemCommand}/>
        );
      })}
    </div>
  );
}
