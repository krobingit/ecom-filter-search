import { Checkbox } from 'semantic-ui-react'
//import styled from 'styled-components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export function Gender({ genderValue,filters,setFilters })
{
 const dispatch = useDispatch();
 const {gender}=useSelector(state=>state.gender)
 const [checked, setChecked] = useState(false);


 const handleChange = (e, data) => {
  setChecked(data.checked)


  if (!data.checked) {
dispatch({type:"RemoveGender",payload:genderValue})
   setFilters({ ...filters, gender })
  }
  else if (data.checked) {
dispatch({type:"AddGender",payload:genderValue})
   setFilters({ ...filters, gender  });
  }
 }
 return (
  <Checkbox label={genderValue} checked={checked}
   onChange={handleChange} />)


}