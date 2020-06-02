import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch} from "react-redux";

import {HeaderPanel} from "./console/HeaderPanel";
import {HistoryPanel} from "./console/HistoryPanel";
import {RequestPanel} from "./console/RequestPanel";
import {ActionPanel} from "./console/ActionPanel";
import {sendsayProxy} from "../api/SendsayProxy";
import {addRequest} from "../actions";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    minWidth: 650
  }
}));

const Console = () => {
  const classes = useStyles();
  const dispatch = useDispatch();


  const examples = [
    { action: 'sys.settings.get', list: ['about.id']},
    {
      action: 'sys.settings.get',
      list: [
        'about.id',
      ]
    },
    {
      action: 'sys.settings.get',

      list: [
        'about.confirm',
        'about.id',
        'about.label.member',
        'about.name',
        'about.open.dt',
        'about.open.visitor',
        'about.owner.email',
        'about.tarif',
        'about.user',
        'anketa.id.base',
        'anketa.id.custom',
        'interface.type',
        'interface.type.user',
        'issue.email.sender.moderation',
        'issue.pte.datakey',
        'lbac.inuse',
        'lbac.on',
        'member.hard.limit',
        'member.hard.rest',
        'member.noconfirm.limit',
        'member.noconfirm.rest',
        'pase.autopayment',
        'pase.destination',
        'pase.left',
        'pase.state',
        'about.chat.on',
      ],
    }
  ];
  let debugInitialRequest;
  try {
    debugInitialRequest = JSON.stringify(examples[0]);
  } catch (e) {
    console.error(e.message);
    debugInitialRequest = "";
  }
  const [request, setRequest] = useState(debugInitialRequest);
  const [rawRequest, setRawRequest] = useState(debugInitialRequest);
  const [response, setResponse] = useState("");
  const [requestError, setRequestError] = useState(false);
  const [responseError, setResponseError] = useState(false);

  const onRequestChange = (value) => {
    setRawRequest(value);
    //setResponse("");
    setRequestError(false);
    //setResponseError(false);
    //console.log("rawRequest = ", value);
  }

  const onCommand = (command, hash) => {

  }

  const onSend = () => {
    //const parsed = parseRequest();
    //console.log("%%%%%%%% ", rawRequest);
    const parsed = parseJson(rawRequest);
    if (parsed) {
      sendsayProxy.request(parsed)
        .then((res) => {
          console.log ("onSend() res=", res);
          const {errorObj} = res;
          let message;
          let responseError = false;
          if (errorObj) {
            if (typeof errorObj === "object") {
              try {
                message = JSON.stringify(errorObj, null, 4);
                dispatch(addRequest(parsed, true));
                responseError = true;
              } catch (e) {
                message = e.message;
                console.error(e.message);
              }
            } else {
              message = errorObj;
            }
          } else {
            try {
              message = JSON.stringify(res, null, 4);
              dispatch(addRequest(parsed, false));
            } catch (e) {
              message = e.message;
              console.error(e.message);
              responseError = true;
            }
          }
          setResponse(message);
          if (responseError) {
            setResponseError(true);
          }
        })
        .catch(error => {
        });

    } else {
      setRequestError(true);
    }
  }

  const onFormat = () => {
    const json = reformatJson(rawRequest);
    if (json) {
      setRequest(json);
      setRawRequest(json);  // синхронизирует rawRequest, но не обязательно!
    } else {
      setRequestError(true);
    }
  }

  const parseJson = (json) => {
    try {
      return JSON.parse(json);
    } catch (e) {
      console.error(e.message);
      return false;
    }
  }

  const reformatJson = (json) => {
    try {
      const parsed = JSON.parse(json);
      return JSON.stringify(parsed, null,4)
    } catch (e) {
      console.error(e.message);
      return false;
    }
  }

  return (
    <div className={classes.root}>
      <HeaderPanel />
      <HistoryPanel onCommand={onCommand}/>
      <RequestPanel request={request}
                    response={response}
                    onChange={onRequestChange}
                    invalidRequest={requestError}
                    errorResponse={responseError}
      />
      <ActionPanel hasRequest={!!request} onSend={onSend} onFormat={onFormat}/>
    </div>
  );
}

export default Console;
