import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";

const initialState = {
    count: 0,
    loading: false,
    error: null

};


const Login = createAsyncThunk("api/login", async (credentials, { rejectWithValue }) => {

    try {
        const response = await axiosInstance.post(credentials)
        return response.data
    }
    catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
    }

})

const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            state.count += 1;
        },
        decrement: (state) => {
            state.count -= 1;
        },
        incrementByAmount: (state, action) => {
            state.count += action.payload;
        },
    },
    extraReducers: (buillder) => {
        buillder

            .addCase(Login.pending, (state, action) => {
                state.loading = true

            })
            .addCase(Login.fulfilled, (state, action) => {
                state.loading = false;

            })
            .addCase(Login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });


    }
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
