import { createSlice } from '@reduxjs/toolkit';

const initialState = { 
  Convo: [],
 };

const UserInteraction_Info = createSlice({
  name: 'UserInteraction_Info',
  initialState,
  Set_Convo_Detail(state, action) { 
    state.Convo.push(action.payload)

   },
  Remove_Convo(state, action) { 
    state.Convo = state.Convo.filter(item => item.id !== action.payload); 
  },

});

export const { Set_Convo_Detail, Remove_Convo } = UserInteraction_Info.actions;
export default UserInteraction_Info.reducer;
