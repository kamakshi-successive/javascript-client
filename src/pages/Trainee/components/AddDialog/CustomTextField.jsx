import React from 'react';
import PropTypes from 'prop-types';
import { InputAdornment } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
// import PersonIcon from '@material-ui/icons'
export default function CustomTextField(props) {
  const {
    error, helperText, onChange, onBlur, label, type, icons,
  } = props;
  const Icon = icons;
  return (
    <>
      {/* <TextField
        id="outlined-required"
        label={label}
        variant="outlined"
        fullWidth
        onChange={onChange}
        onBlur={onBlur}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon />
            </InputAdornment>
          ),
        }}
        helperText={helperText}
        error={error}
        type={type}
      /> */}
      <TextField
        id="outlined-full-width"
        label={label}
        autoComplete="off"
        fullWidth
        error={error}
        helperText={helperText}
        onBlur={onBlur}
        onChange={onChange}
        placeholder=""
        margin="normal"
        type={type}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon />
            </InputAdornment>
          ),
        }}
        variant="outlined"
      />
    </>
  );
}

CustomTextField.propTypes = {
  error: PropTypes.bool,
  helperText: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  icons: PropTypes.instanceOf(Object),
};
CustomTextField.defaultProps = {
  error: false,
  helperText: '',
  label: '',
  type: false,
  icons: {},
};
