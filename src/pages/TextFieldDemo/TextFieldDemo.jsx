import React from 'react';
import { TextField } from '../../components/TextField';
import { Div } from '../../components/TextField/style';
import { Slider } from '../../components/Slider';
import { banners } from '../../config/constant';

const TextFieldDemo = () => (
  <Div>
    <Slider altText="Default Banner" banners={banners} duration={2000} height={200} random={false} />
    <p><b>This is Disabled Input</b></p>
    <TextField disabled value="Disabled Input" />
    <p><b>A Valid Input</b></p>
    <TextField value="Accessible" />
    <p><b>An Input with an errors</b></p>
    <TextField error="Could not be more than" value="101" />
  </Div>
);

export default TextFieldDemo;
