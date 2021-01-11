import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Controller } from "react-hook-form";
import clsx from 'clsx';

// Material-UI

import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  label: {
    marginRight: theme.spacing(3),
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: '1.1876em',
    letterSpacing: '0.00938em',
  },
  option: {
    marginRight: theme.spacing(3),
  },
  errorMessages: {
    backgroundColor: '#ffe4cd',
    padding: theme.spacing(1),
    borderRadius: '4px',
    margin: 0,
    '& > li': {
      marginLeft: theme.spacing(1),
      lineHeight: '1.3em',
      color: '#f44336',
      fontSize: '0.75rem',
    }
  },
  radioGroup: {
    padding: 0,
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
  helperText: {
    color: 'rgba(0, 0, 0, 0.54)',
    margin: 0,
    marginTop: theme.spacing(0.5),
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: 1.66,
    letterSpacing: '0.03333em',
  },
  red: {
    color: '#f44336',
  },
  required: {
    color: '#f44336',
    fontSize: '1.3rem',
    position: 'relative',
    top: 0,
    marginLeft: '0.2rem',
  },
}));

const ConfiguredRadioGroup = (props) => {
  
  const classes = useStyles();

  const findObject = (object, keys) => {
    if (Object.keys(object).length !== 0) {
      if (keys.length > 0 && object[keys[0]]) {
        const key = keys.shift();
        return findObject(object[key], keys);
      } else return object;
    } else return null;
  }
  
  const errorObject = findObject(props.errors, props.name.split('.'));

  return (
    <Controller
      autoFocus={props.autoFocus ? props.autoFocus : false}
      disabled={props.disabled ? props.disabled : false}
      name={props.name}
      control={props.control}
      error={errorObject && errorObject.types}
      rules={{
        required: props.required ? props.required : false
      }}
      render={properties => (
        <Fragment>
          <FormControl component="fieldset" className={classes.radioGroup}>
            <Typography variant="body1"
              className={clsx(classes.label, {
                [classes.red]: props.errors[props.name],
              })}>
                {props.label}
                {props.required ? (
                  <span className={classes.required}>*</span>
                ) : null}
            </Typography>
            <RadioGroup row
              onChange={e => properties.onChange(e.target.value)}
              value={properties.value}>
              {Object.entries(props.values).map(([key, label], i) => {
                return (
                  <FormControlLabel className={classes.option} key={i} value={key} control={<Radio />} label={label}/>
                )
              })}
            </RadioGroup>
          </FormControl>
          {errorObject !== null && errorObject.types ? (
            <ul className={classes.errorMessages}>
              {Object.keys(errorObject.types).map((k) => {
                const errorMessages = {
                  required: 'This field is required!',
                  validate: 'Validate function!',
                }
                return (<li key={k}>{errorMessages[k]}</li>)
              })}
            </ul>
          ) : props.helperText ? (
            <p className={classes.helperText}>{props.helperText}</p>
          ) : null}
        </Fragment>
      )}/>
  )
};

ConfiguredRadioGroup.propTypes = {
  autoFocus:      PropTypes.bool,
  disabled:       PropTypes.bool,
  name:           PropTypes.string.isRequired,
  label:          PropTypes.string.isRequired,
  required:       PropTypes.bool,
  control:        PropTypes.object.isRequired,
  values:         PropTypes.object.isRequired,
  errors:         PropTypes.object,
};

export default ConfiguredRadioGroup;


//<Controller
  // name="has_mall"
  // aria-label="has_mall"
  // control={control}
  // render={props => (
  //   <FormControl component="fieldset">
  //     <FormLabel component="legend"></FormLabel>
  //     <RadioGroup row
  //       onChange={e => props.onChange(e.target.value)}
  //       value={props.value}>
  //       <FormControlLabel value="" control={<Radio />} label="Don't know" />
  //       <FormControlLabel value="true" control={<Radio />} label="Yes" />
  //       <FormControlLabel value="false" control={<Radio />} label="No" />
  //     </RadioGroup>
  //   </FormControl>
  // )} />