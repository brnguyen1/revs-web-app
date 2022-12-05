import { createSlice } from '@reduxjs/toolkit';

export const fontsizeSlice = createSlice({
    name: "fontsize",
    initialState: { val: { fontsize: 16 } },
    reducers: {
        increaseFontSize: (state, action) => {
            state.val = state.val + 4;

        },
        decreaseFontSize: (state, action) => {
            state.val = state.val - 4;
        }
    }
});


export default fontsizeSlice.reducer;
export const { increaseFontSize, decreaseFontSize } = fontsizeSlice.actions;