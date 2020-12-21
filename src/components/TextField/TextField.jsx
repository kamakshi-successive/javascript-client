import React from 'react';
import PropTypes from 'prop-types';
import { Input, Error } from './style';

const TextField = (props) => {
  const {
    disabled, value, error, onChange, onBlur,
  } = props;
  if (Error) {
    return (
      <>
        <Input type="text" value={value} disabled={disabled} error onChange={onChange} onBlur={onBlur} />
        <br />
        <Error>{ error }</Error>
      </>
    );
  }

  return (
    <Input type="text" value={value} disabled={disabled} onChange={onChange} />
  );
};

TextField.propTypes = {
  disabled: PropTypes.bool,
  value: PropTypes.number.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.string.isRequired,
};

TextField.defaultProps = {
  disabled: false,
  error: '',
  onChange: '',
};

export default TextField;
