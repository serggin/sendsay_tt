import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import {Button, FormControl, FormLabel, FormHelperText, OutlinedInput, Paper, Typography} from "@material-ui/core";
import {useDispatch} from "react-redux";

import Logo from "../components/Logo";
import {login as loginApi} from "../api/login";
import {sendsayProxy} from "../api/SendsayProxy";
import Config from "../config";
import {setScreen} from "../actions";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
    height: '100%'
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: 360,
  },
  paper: {
    padding: 20
  },
  loginInput: {
    marginBottom: 10,
    width: "100%"
  },
  loginInputHelper: {
    position: "absolute",
    top: 0,
    right: 0,
    lineHeight: 1,
  },
  button: {
    textTransform: "none"
  },
  error: {
    padding: 10,
    color: theme.palette.error.main,
    backgroundColor: fade(theme.palette.error.main, .1),
    whiteSpace: "pre-line"
  }
}));

const LoginInput = ({label, type="text", value, onChange, helper, error}) => {
  const classes = useStyles();

  return (
    <FormControl className={classes.loginInput}>
      <FormLabel>{label}</FormLabel>
      <FormHelperText className={classes.loginInputHelper}>{helper}</FormHelperText>
      <OutlinedInput fullWidth type={type} value={value} onChange={onChange} error={error}/>
    </FormControl>
  );
}

const Login = (props) => {
  const classes = useStyles();

  const [login, setLogin] = useState("");
  const [sublogin, setSublogin] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const onLoginChange = (value) => {
    const trimmedValue = value.trim();
    if (trimmedValue !== login) {
      setLogin(trimmedValue);
      setLoginError(false);
    }
  }
  const onSubloginChange = (value) => {
    const trimmedValue = value.trim();
    if (trimmedValue !== login) {
      setSublogin(trimmedValue);
    }
  }
  const onPasswordChange = (value) => {
    const trimmedValue = value.trim();
    if (trimmedValue !== password) {
      setPassword(trimmedValue);
      setPasswordError(false);
    }
  }
  const onSubmit = () => {
    if (login && password) {
//      loginApi({login, sublogin, password})
//      console.log("sendsayProxy=", sendsayProxy);
      sendsayProxy.login({login, sublogin, password})
        .then(result => {
          console.log("loginApi() result=", result);
          console.log(document.cookie);
          const {errorObj} = result;
          if (errorObj) {
            setError(`Вход не вышел \f
            ${JSON.stringify(errorObj)}
            `);
          } else {
            props.history.push("/console");
          }
        })
    } else {
      if (!login) {
        setLoginError(true);
      }
      if (!password) {
        setPasswordError(true);
      }
      setError('Поля "Логин" и "Пароль" обязательны для заполнения!');
    }
  }

  useEffect(() => {
    setError("");
  }, [login, sublogin, password]);

  useEffect(() => { //DEBUG !!!!!!!!!!!!!!!!!!!!!!!!!!!
    console.log(document.cookie);
    const debug = true;
    if (debug) {
      setLogin(Config.login);
      setPassword(Config.password);
    }
    setError("");
  }, []);


  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Logo />
        <Paper className={classes.paper}>
          <Typography variant="h5" gutterBottom>API-консолька</Typography>
          {error && <div className={classes.error}>{error}</div>}
          <LoginInput
            label="Логин"
            value={login}
            error={loginError}
            onChange={e => onLoginChange(e.target.value)}
          />
          <LoginInput
            label="Сублогин"
            helper="опционально"
            value={sublogin}
            onChange={e => onSubloginChange(e.target.value)}
          />
          <LoginInput
            label="Пароль"
            type="password"
            value={password}
            error={passwordError}
            onChange={e => onPasswordChange(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={onSubmit}
          >
            Войти
          </Button>
        </Paper>
      </div>
    </div>
  );
}

export default Login;
