import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false, // ✅ Ensure correct spelling (camelCase)
    },
    reducers: {
        login: (state) => {
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.isLoggedIn = false;
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice.reducer; // ✅ Default export is required
