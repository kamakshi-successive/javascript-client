/* eslint-disable no-console */
import React from 'react';
import {
  TextField, Button, RadioField, SelectField,
} from '../../components/index';

import {
  schema, selectOptions, radioOptionsCricket, radioOptionsFootball,
} from '../../config/constant';

class InputDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      sport: '',
      cricket: '',
      football: '',
      error: {},
      isvalid: false,
      touched: {
        name: false,
        sport: false,
        cricket: false,
        football: false,
      },
    };
    console.log(this.state);
  }

handleNameChange = (e) => {
  this.setState({ name: e.target.value }, () => {
    console.log(this.state);
  });
}

handleSportChange = (e) => {
  this.setState({ sport: e.target.value }, () => console.log(this.state));
  if (e.target.value === 'Select') {
    this.setState({ sport: '' });
  }
  return e.target.value === 'cricket' ? this.setState({ football: '' }) : this.setState({ cricket: '' });
}

handlePositionChange = (e) => {
  const { sport } = this.state;
  return sport === 'cricket' ? this.setState({ cricket: e.target.value }, () => console.log(this.state)) : this.setState({ football: e.target.value }, () => console.log(this.state));
}

RadioOption = () => {
  let { radioValue } = this.state;
  const { sport } = this.state;
  if (sport === 'cricket') {
    radioValue = radioOptionsCricket;
  } else if (sport === 'football') {
    radioValue = radioOptionsFootball;
  }
  return (radioValue);
};

hasErrors = () => {
  const { touched } = this.state;
  const errormsg = {};
  schema.validate(this.state, { abortEarly: false })
    .then(() => {
      this.setState({ error: {}, isvalid: true });
    })
    .catch((err) => {
      err.inner.forEach((element) => {
        const { path, message } = element;
        if (touched[path]) {
          errormsg[path] = message;
        }
      });
      this.setState({ error: errormsg, isvalid: false });
    });
}

isTouched = (field) => {
  const { touched } = this.state;
  console.log('touched', touched);
  this.setState({
    touched: {
      ...touched,
      [field]: true,
    },
  }, () => {
    this.hasErrors();
  });
}

getErrors = (field) => {
  const { touched, error } = this.state;
  return touched[field] ? error[field] : '';
}

render() {
  const {
    name, sport, error, isvalid,
  } = this.state;
  return (
    <>

      <p><b>Name</b></p>
      <TextField
        onChange={this.handleNameChange}
        value={name}
        error={error.name}
        onBlur={() => this.isTouched('name')}
      />
      <p>
        <b>Select the game you play?</b>
      </p>
      <SelectField
        defaultOptions="Select"
        onChange={this.handleSportChange}
        value={sport}
        onBlur={() => this.isTouched('sport')}
        options={selectOptions}
        error={error.sport}
      />
      <div>
        {
          (sport === '' || sport === 'Select') ? '' : (
            <>
              <p><b>What you do?</b></p>
              <RadioField
                onChange={this.handlePositionChange}
                options={this.RadioOption()}
                onBlur={() => this.isTouched('sport')}
                error={error.sport}
              />
            </>
          )
        }
      </div>
      <div align="right">
        <Button value="Cancel" onClick={() => {}} />
        <Button value="Submit" disabled={!isvalid} onClick={() => {}} />
      </div>
    </>
  );
}
}
export default InputDemo;
