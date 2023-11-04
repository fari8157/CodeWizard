import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./them_slice";

const store =configureStore({
    reducer:{
        theme:themeSlice.reducer
    }
})

export default store