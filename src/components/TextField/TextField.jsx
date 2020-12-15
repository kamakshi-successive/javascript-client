import React from 'react';
import PropTypes from 'prop-types';
import { Input, Error } from './style';

const TextField = (props) => {
  const { disabled, value, error } = props;
  if (Error) {
    return (
      <>
        <Input type="text" value={value} disabled={disabled} error />
        <br />
        <Error>{ error }</Error>
      </>
    );
  }

  return (
    <Input type="text" value={value} disabled={disabled} />
  );
};

TextField.propTypes = {
  disabled: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
  error: PropTypes.string.isRequired,
};

export default TextField;
