import { configureStore } from "@reduxjs/toolkit";
import proReducer from "./prodRoute";
import authReducer from "./authReduce"; // Make sure this is correct

const store = configureStore({
    reducer: {
        prod: proReducer,
        auth: authReducer, // ✅ Ensure this matches your slice name
    },
});

export default store;
