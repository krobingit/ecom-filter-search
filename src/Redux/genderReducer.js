let initialState = {
gender:[]
}

 const genderReducer = (state = initialState, action) => {
  const { gender } = state;

  switch (action.type) {

  case "AddGender":
   {

     gender.push(action.payload)


    return {...state,
gender
    }
    }
   case "RemoveGender":
    {
     let copy = gender;
     copy.splice(copy.indexOf(action.payload), 1);
     return {
      ...state,
      gender: copy
     }

    }
    case "ClearGender":
    {

     return {
      ...state,
    gender: []
     }

    }
  default:
  return state

 }
 }

export {genderReducer}