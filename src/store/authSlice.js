import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";
import fileInstance from "./fileInstance"
import Appapis from "./apiendpoints";
const initialState = {
    count: 0,
    loading: false,
    error: null

};


export const Login = createAsyncThunk("api/login", async (credentials, { rejectWithValue }) => {

    try {
        const response = await axiosInstance.post(`${Appapis.Basurl}${Appapis.signIn}`, credentials)
        return response.data
    }
    catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
    }

})
export const VerifyOtp = createAsyncThunk("api/verify", async (credentials, { rejectWithValue }) => {

    try {
        const response = await axiosInstance.post(`${Appapis.Basurl}${Appapis.verifyOtp}`, credentials)
        return response.data
    }
    catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
    }

})
export const Contact = createAsyncThunk("api/", async (credentials, { rejectWithValue }) => {

    try {
        const response = await axiosInstance.post(`${Appapis.Basurl}${Appapis.contact}`, credentials)
        return response.data
    }
    catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
    }

})
export const SavePrescription = createAsyncThunk("api/presc", async (credentials, { rejectWithValue }) => {

    try {
        const response = await axiosInstance.post(`${Appapis.Basurl}${Appapis.prescription}`, credentials)
        return response.data
    }
    catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
    }

})
export const FileUpload = createAsyncThunk("api/upload", async (credentials, { rejectWithValue }) => {

    try {
        const response = await fileInstance.post(`${Appapis.Basurl}${Appapis.fileUpload}`, credentials)
        return response.data
    }
    catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong", error);
    }

})
export const CategoryList = createAsyncThunk("api/category", async (credentials, { rejectWithValue }) => {

    try {
        const response = await axiosInstance.get(`${Appapis.Basurl}${Appapis.ctegory}`, credentials)
        return response.data
    }
    catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong", error);
    }

})
export const WallPaperList = createAsyncThunk("api/wallpaper", async (credentials, { rejectWithValue }) => {

    try {
        const response = await axiosInstance.get(`${Appapis.Basurl}${Appapis.wallpaper}`, credentials)
        return response.data
    }
    catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong", error);
    }

})

export const ProductList = createAsyncThunk("api/productList", async (credentials, { rejectWithValue }) => {

    try {
        const response = await axiosInstance.get(`${Appapis.Basurl}${Appapis.product}`, credentials)
        return response.data
    }
    catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong", error);
    }

})
export const AddCart = createAsyncThunk("api/cart", async (credentials, { rejectWithValue }) => {
    console.log("Credentials", credentials)
    try {
        const response = await axiosInstance.post(`${Appapis.Basurl}${Appapis.cart}`, credentials)
        return response.data
    }
    catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong", error);
    }

})
export const getProductDetail = createAsyncThunk(
    "api/productDetail",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${Appapis.Basurl}${Appapis.productDetail(id)}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);
export const MakePayment = createAsyncThunk(
    "api/createPayment",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`${Appapis.Basurl}${Appapis.createPayment}`, credentials);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);
export const VerifyPayment = createAsyncThunk(
    "api/verifyPayment",
    async (response, { rejectWithValue }) => {
        console.log("Inside Verify:", response);

        try {
            const res = await axiosInstance.post(
                `${Appapis.Basurl}${Appapis.verify}`,
                response
            );

            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Payment verification failed");
        }
    }
);
export const getCartDetail = createAsyncThunk(
    "api/cartdetail",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${Appapis.Basurl}${Appapis.cartItems(id)}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);



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
            })
            .addCase(VerifyOtp.pending, (state, action) => {
                state.loading = true

            })
            .addCase(VerifyOtp.fulfilled, (state, action) => {
                state.loading = false;

            })
            .addCase(VerifyOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(Contact.pending, (state, action) => {
                state.loading = true

            })
            .addCase(Contact.fulfilled, (state, action) => {
                state.loading = false;

            })
            .addCase(Contact.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(SavePrescription.pending, (state, action) => {
                state.loading = true

            })
            .addCase(SavePrescription.fulfilled, (state, action) => {
                state.loading = false;

            })
            .addCase(SavePrescription.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(FileUpload.pending, (state, action) => {
                state.loading = true

            })
            .addCase(FileUpload.fulfilled, (state, action) => {
                state.loading = false;

            })
            .addCase(FileUpload.rejected, (state, action) => {
                ////console.log("Acc", action)
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(CategoryList.pending, (state, action) => {
                state.loading = true

            })
            .addCase(CategoryList.fulfilled, (state, action) => {
                state.loading = false;

            })
            .addCase(CategoryList.rejected, (state, action) => {

                state.loading = false;
                state.error = action.payload;
            })
            .addCase(WallPaperList.pending, (state, action) => {
                state.loading = true

            })
            .addCase(WallPaperList.fulfilled, (state, action) => {
                state.loading = false;

            })
            .addCase(WallPaperList.rejected, (state, action) => {

                state.loading = false;
                state.error = action.payload;
            })
            .addCase(ProductList.pending, (state, action) => {
                state.loading = true

            })
            .addCase(ProductList.fulfilled, (state, action) => {
                state.loading = false;

            })
            .addCase(ProductList.rejected, (state, action) => {

                state.loading = false;
                state.error = action.payload;
            })
            .addCase(AddCart.pending, (state, action) => {
                state.loading = true

            })
            .addCase(AddCart.fulfilled, (state, action) => {
                state.loading = false;

            })
            .addCase(AddCart.rejected, (state, action) => {

                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getProductDetail.pending, (state, action) => {
                state.loading = true

            })
            .addCase(getProductDetail.fulfilled, (state, action) => {
                state.loading = false;

            })
            .addCase(getProductDetail.rejected, (state, action) => {

                state.loading = false;
                state.error = action.payload;
            })
            .addCase(MakePayment.pending, (state, action) => {
                state.loading = true

            })
            .addCase(MakePayment.fulfilled, (state, action) => {
                state.loading = false;

            })
            .addCase(MakePayment.rejected, (state, action) => {

                state.loading = false;
                state.error = action.payload;
            })
            .addCase(VerifyPayment.pending, (state, action) => {
                state.loading = true

            })
            .addCase(VerifyPayment.fulfilled, (state, action) => {
                state.loading = false;

            })
            .addCase(VerifyPayment.rejected, (state, action) => {

                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getCartDetail.pending, (state, action) => {
                state.loading = true

            })
            .addCase(getCartDetail.fulfilled, (state, action) => {
                state.loading = false;

            })
            .addCase(getCartDetail.rejected, (state, action) => {

                state.loading = false;
                state.error = action.payload;
            })


    }
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
