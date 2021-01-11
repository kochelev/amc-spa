import React from 'react';
import PropTypes from 'prop-types';

// Material-UI

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles(theme => ({
  errorMessages: {
    backgroundColor: '#ffe4cd',
    padding: theme.spacing(1),
    borderRadius: '4px',
    margin: 0,
    '& > li': {
      marginLeft: theme.spacing(1),
      lineHeight: '1.3em',
    }
  }
}));

const ConfiguredTextField = (props) => {
  
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
    <TextField
      type="text"
      margin="dense"
      fullWidth
      autoFocus={props.autoFocus ? props.autoFocus : false}
      disabled={props.disabled ? props.disabled : false}
      id={props.name}
      name={props.name}
      label={props.label + (props.required ? ' *' : '')}
      inputRef={props.register({
        required: props.required ? props.required : false,
        min: props.min ? props.min : null,
        max: props.max ? props.max : null,
        minLength: props.minLength ? props.minLength : null,
        maxLength: props.maxLength ? props.maxLength : null,
        pattern: props.pattern ? props.pattern.expression : null,
        validate: props.validate ? props.validate.func : null,
      })}
      InputProps={{
        startAdornment: props.startAdornment ? (
          <InputAdornment position="start">{props.startAdornment}</InputAdornment>
        ) : null,
        endAdornment: props.endAdornment ? (
          <InputAdornment position="end">{props.endAdornment}</InputAdornment>
        ) : null,
      }}
      error={errorObject && errorObject.types}
      helperText={errorObject !== null && errorObject.types ? (
        <ul className={classes.errorMessages}>
          {Object.keys(errorObject.types).map((k) => {
            const errorMessages = {
              required: 'This field is required!',
              min: 'Should be more than ' + props.min,
              max: 'Should be less than ' + props.max,
              minLength: 'Should be at least ' + props.minLength + ' characters',
              maxLength: 'Should be less than ' + props.maxLength + ' characters',
              pattern: props.pattern ? props.pattern.errorMessage : null,
              validate: 'Validate function!',
            }
            return (<li key={k}>{errorMessages[k]}</li>)
          })}
        </ul>
      ) : props.helperText ? props.helperText : null} />
  );
};

ConfiguredTextField.propTypes = {
  autoFocus:      PropTypes.bool,
  disabled:       PropTypes.bool,
  name:           PropTypes.string.isRequired,
  label:          PropTypes.string.isRequired,
  helperText:     PropTypes.string,
  startAdornment: PropTypes.string,
  endAdornment:   PropTypes.string,
  required:       PropTypes.bool,
  min:            PropTypes.number,
  max:            PropTypes.number,
  minLength:      PropTypes.number,
  maxLength:      PropTypes.number,
  pattern:        PropTypes.object,
  validate:       PropTypes.func,
  register:       PropTypes.func.isRequired,
  errors:         PropTypes.object,
};

export default ConfiguredTextField;