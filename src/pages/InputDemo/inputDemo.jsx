/* eslint-disable max-len */
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
      touched: {
        name: false,
        sport: false,
        cricket: false,
        football: false,
      },
    };
  }

handleNameChange = (e) => {
  this.setState({ name: e.target.value }, () => {
    console.log(this.state);
  });
}

handleSportChange = (e) => {
  this.setState({ sport: e.target.value }, () => console.log(this.state));
  if (e.target.value === selectOptions.value) {
    this.setState({ sport: '' });
  }
  return e.target.value === radioOptionsCricket.value ? this.setState({ cricket: e.target.value }) : this.setState({ football: e.target.value });
}

handlePositionChange = (e) => {
  const { sport } = this.state;
  return sport === radioOptionsCricket.value ? this.setState({ cricket: e.target.value }, () => console.log(this.state)) : this.setState({ football: e.target.value }, () => console.log(this.state));
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

getError = (field) => {
  const { touched } = this.state;
  if (touched[field] && this.hasErrors()) {
    try {
      schema.validateSyncAt(field, this.state);
    } catch (err) {
      return err.message;
    }
  }
  return true;
};

hasErrors = () => {
  try {
    schema.validateSync(this.state);
  } catch (err) {
    return true;
  }
  return false;
}

isTouched = (field) => {
  const { touched } = this.state;
  this.setState({
    touched: {
      ...touched,
      [field]: true,
    },
  });
}

render() {
  const { sport } = this.state;
  return (
    <>
      <div>
        <p><b>Name:</b></p>
        <TextField error={this.getError('name')} onChange={this.handleNameChange} onBlur={() => this.isTouched('name')} />
        <p><b>Select the game you play?</b></p>
        <SelectField
          error={this.getError('sport')}
          onChange={this.handleSportChange}
          options={selectOptions}
          defaultText="Select"
          onBlur={() => this.isTouched('sport')}
        />
        <div>
          {
            (sport === '' || sport === selectOptions.value) ? ''
              : (
                <>
                  <p><b>What you do?</b></p>
                  <RadioField
                    error={this.getError(sport)}
                    options={this.RadioOption()}
                    onChange={this.handlePositionChange}
                    onBlur={() => this.isTouched(sport)}
                  />
                </>
              )
          }
        </div>
        <div>
          <Button value="Cancel" />
          <Button value="Submit" disabled={this.hasErrors()} />
        </div>
      </div>
    </>
  );
}
}
export default InputDemo;
