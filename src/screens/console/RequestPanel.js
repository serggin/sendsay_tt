import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Typography} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Split from 'react-split';

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100%",
    padding: 10,
    boxSizing: "border-box"
  },
  jsonPanel: {
    display: "flex",
    flexDirection: "column",
    height: "100%"
  },
  textarea: {
//    backgroundColor: "#bbb",
    resize: "none",
    width: "100%",
    height: "100%",
    boxSizing: "border-box"
  },
  textareaError: {
    borderStyle: "solid",
    borderColor: "red"
  },
  split: {
    height: "100%",
    display: "flex",
  },
  gutter: {
    width: 10,
    backgroundColor: "green"
    //backgroundImage: MoreVertIcon
  }
}));

const JsonPanel = ({label, editable=true, panelValue, onChange, hasError}) => {
  const classes = useStyles();

  const props = onChange ? {onChange} : {};
  const [value, setValue] = useState("");

  useEffect(() => {
    //console.log("??? useEffect panelValue=", panelValue, "count=", count);
    setValue(panelValue);
  }, [panelValue]);

  const onTextChange = (value) => {
    setValue(value);
    if (onChange) {
      onChange(value);
    }
  }

  const classNames = `${classes.textarea} ${hasError ? classes.textareaError : ""}`;

  return (
    <div className={classes.jsonPanel}>
      <Typography variant="subtitle1">{label} :</Typography>
      <textarea className={classNames}
                readOnly={!editable}
                value={value}
                onChange={e => onTextChange(e.target.value)} />
    </div>
  );
}

/*
const Gutter = (index, direction, pairElement) => {
  const classes = useStyles();
  const gutter = document.createElement('div');
  gutter.className = classes.gutter
  return gutter
}
*/

export const RequestPanel = ({onChange, request, response, invalidRequest, errorResponse}) => {
  const classes = useStyles();

  const onRequestChange = (value) => {
    onChange(value);
  }

  return (
    <div className={classes.root}>
      <Split className={classes.split} sizes={[50, 50]}
             minSize={100}
             expandToMin={false}
             gutterSize={10}
             gutterAlign="center"
             snapOffset={30}
             dragInterval={1}
             direction="horizontal"
             cursor="col-resize"
      >
        <JsonPanel label="Запрос"
                   panelValue={request}
                   onChange={onRequestChange}
                   hasError={invalidRequest}
        />
        <JsonPanel label="Ответ" editable={false}
                   panelValue={response}
                   hasError={errorResponse}
        />
      </Split>
    </div>
  );
}
