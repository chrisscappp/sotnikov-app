import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectComponent = ({selectProp, children}) => {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div style = {{paddingTop: '10px'}}>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">{selectProp.inputLabel}</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={value}
          label={selectProp.inputLabel}
          onChange={handleChange}
        >
          {children}
        </Select>
        <FormHelperText>{selectProp.helperText}</FormHelperText>
      </FormControl>
    </div>
  );
}

export default SelectComponent