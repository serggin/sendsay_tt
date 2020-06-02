import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, IconButton} from "@material-ui/core";
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';




import Logo from "../../components/Logo";
import {Box, Typography} from "@material-ui/core";
import {pong} from "../../api/pong";
import {sendsayProxy} from "../../api/SendsayProxy";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#eee",
  },
  leftGroup: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: 280
  },
  rightGroup: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: 350
  },
  account: {
    padding: 10
  },
  exitButton: {
    textTransform: "none"
  }
}));

const Account = () => {
  const classes = useStyles();
  const [account, setAccount] = useState("");
  const [sublogin, setSublogin] = useState("");

  useEffect(() => {
//    pong()
    sendsayProxy.pong()
    //sendsayProxy.test()
      .then(res => {
          setAccount(res.account);
          if (res.account !== res.sublogin) {
            setSublogin(res.sublogin);
          }
      })
    }, [])

    return (
      <Box className={classes.account} border={1} borderRadius="borderRadius" borderColor="grey.400">
        {account}
        {sublogin && (" : " + sublogin)}
      </Box>
    );
}

const ExitButton = () => {
  return (
    <Button className="exitButton"
            color="default"
            endIcon={<ExitToAppIcon />}
            >
      Выйти
    </Button>
  );
}

const FullscreenButton = () => {
  return (
    <IconButton>
      <FullscreenIcon />
    </IconButton>
  );
}

export const HeaderPanel = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.leftGroup}>
        <Logo />
        <Typography variant="h6">API-консолька</Typography>
      </div>
      <div className={classes.rightGroup}>
        <Account />
        <ExitButton />
        <FullscreenButton />
      </div>
    </div>
  );
}
