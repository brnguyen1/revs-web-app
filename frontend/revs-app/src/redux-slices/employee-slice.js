import { createSlice } from '@reduxjs/toolkit';

export const employeeSlice = createSlice({
    name: "user",
    initialState: { val: { username: "", password: "" } },
    reducers: {
        employeeLogin: (state, action) => {
            state.val = action.payload;
        },
        employeeLogout: (state, action) => {
            state.val = { username: "", password: "" };
        }
    }
});


export default employeeSlice.reducer;
export const {employeeLogin, employeeLogout} = employeeSlice.actions;

