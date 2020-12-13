import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import P from './style';

const RadioField = (props) => {
  // console.log('inside radio group', props);
  const {
    options, onChange, error, heading, onBlur,
  } = props;
  return (
    <>
      <p><b>{heading}</b></p>
      {
        options && options.length && options.map(({ value, label }) => (
          <Fragment key={label}>
            <input type="radio" name="game" value={value} onChange={(event) => onChange(event)} onBlur={onBlur} />
            {label}
            <br />
          </Fragment>
        ))
      }
      <P>
        {error}
      </P>
    </>
  );
};
RadioField.propTypes = {
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  heading: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
};
RadioField.defaultProps = {
  error: '',
};
export default RadioField;
