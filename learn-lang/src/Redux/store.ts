import { configureStore } from "@reduxjs/toolkit";
import rootreducer from "./Slices"


export const store =configureStore({reducer:{
    root:rootreducer
}})