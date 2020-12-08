import React from 'react';
import { TextField } from '../../components/TextField';
import { Div } from '../../components/TextField/style';

const TextFieldDemo = () => (
  <Div>
    <p><b>This is Disabled Input</b></p>
    <TextField disabled value="Disabled Input" />
    <p><b>A Valid Input</b></p>
    <TextField value="Accessible" />
    <p><b>An Input with an errors</b></p>
    <TextField error="Could not be more than" value="101" />
  </Div>
);

export default TextFieldDemo;
