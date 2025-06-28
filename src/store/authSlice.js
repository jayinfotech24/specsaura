import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";
import fileInstance from "./fileInstance"
import Appapis from "./apiendpoints";
import { useNavigate } from "react-router-dom";

const initialState = {
    count: 0,
    loading: false,
    error: null
};

// Utility function to handle 401 responses
const handleUnauthorized = (error) => {
    if (error?.response?.status === 401 || error?.status === 401) {
        // Clear any auth tokens/storage if needed
        localStorage.removeItem('token');
        // Redirect to login
        window.location.href = '/login';
    }
    return error;
}
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
            console.log("Error", error)
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);
export const VerifyPayment = createAsyncThunk(
    "api/verifyPayment",
    async (credentials, { rejectWithValue }) => {
        console.log("Inside Verify:", credentials);

        try {
            const response = await axiosInstance.post(
                `${Appapis.Basurl}${Appapis.verify}`,
                credentials
            );

            return response.data;
        } catch (error) {
            console.log("Error", error)
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

export const DeleteCart = createAsyncThunk(
    "api/deleteCart",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(`${Appapis.Basurl}${Appapis.deleteCart(id)}`);
            return response.data;
        } catch (error) {
            console.log("DeleteCartError", error)
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);

export const CreateOrder = createAsyncThunk(
    "api/createOrder",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`${Appapis.Basurl}${Appapis.createOrder}`, credentials);
            return response.data;
        } catch (error) {
            console.log("CreateOrderError", error)
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);
export const GetUser = createAsyncThunk("api/getUser", async (credentials, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`${Appapis.Basurl}${Appapis.Getuser}`);
        return response.data;
    }
    catch (error) {

        return rejectWithValue(error.response?.data || "Something went wrong");
    }
});
export const GetOrderById = createAsyncThunk(
    "api/getOrder",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${Appapis.Basurl}${Appapis.getOrder(id)}`);
            return response.data;
        } catch (error) {
            console.log("GetOrderErroor", error.message)
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);
export const UpdateUser = createAsyncThunk(
    "api/updateUser",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(`${Appapis.Basurl}${Appapis.updateUser}`, credentials);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);

export const GetSingleCart = createAsyncThunk(
    "api/getSingleCart",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${Appapis.Basurl}${Appapis.getSingleCart(id)}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);

export const DeleteFullCart = createAsyncThunk(
    "api/deleteFullCart",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(
                `${Appapis.Basurl}${Appapis.deleteFullCart}`,
                {
                    data: credentials // <-- this is the fix
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);


export const GetCartMany = createAsyncThunk(
    "api/getCartMany",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${Appapis.Basurl}${Appapis.getCartMany}`);
            return response.data;
        }
        catch (error) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);
export const UpdateCartFlag = createAsyncThunk(
    "api/updateCartFlag",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(`${Appapis.Basurl}${Appapis.updateCartFlag(id)}`);
            return response.data;
        }
        catch (error) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);

export const UpdateCart = createAsyncThunk(
    "api/updateCart",
    async ({ cartId, data }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(`${Appapis.Basurl}${Appapis.updateCart(cartId)}`, data);
            return response.data;
        }
        catch (error) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);


export const GetLensType = createAsyncThunk(
    "api/getLensType",
    async (type, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${Appapis.Basurl}${Appapis.lenseType(type)}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to get lens type data");
        }
    }
);
export const GetBlog = createAsyncThunk(
    "api/getBlog",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${Appapis.Basurl}${Appapis.getBlog}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to get blog data");
        }
    }
);
export const GetLensDeatil = createAsyncThunk(
    "api/getLensDetail",
    async (type, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${Appapis.Basurl}${Appapis.lensDetail(type)}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to get lens type data");
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
                state.error = handleUnauthorized(action.payload);
            })
            .addCase(VerifyOtp.pending, (state, action) => {
                state.loading = true

            })
            .addCase(VerifyOtp.fulfilled, (state, action) => {
                state.loading = false;

            })
            .addCase(VerifyOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = handleUnauthorized(action.payload);
            })
            .addCase(Contact.pending, (state, action) => {
                state.loading = true

            })
            .addCase(Contact.fulfilled, (state, action) => {
                state.loading = false;

            })
            .addCase(Contact.rejected, (state, action) => {
                state.loading = false;
                state.error = handleUnauthorized(action.payload);
            })
            .addCase(SavePrescription.pending, (state, action) => {
                state.loading = true

            })
            .addCase(SavePrescription.fulfilled, (state, action) => {
                state.loading = false;

            })
            .addCase(SavePrescription.rejected, (state, action) => {
                state.loading = false;
                state.error = handleUnauthorized(action.payload);
            })
            .addCase(FileUpload.pending, (state, action) => {
                state.loading = true

            })
            .addCase(FileUpload.fulfilled, (state, action) => {
                state.loading = false;

            })
            .addCase(FileUpload.rejected, (state, action) => {
                state.loading = false;
                state.error = handleUnauthorized(action.payload);
            })
            .addCase(CategoryList.pending, (state, action) => {
                state.loading = true

            })
            .addCase(CategoryList.fulfilled, (state, action) => {
                state.loading = false;

            })
            .addCase(CategoryList.rejected, (state, action) => {
                state.loading = false;
                state.error = handleUnauthorized(action.payload);
            })
            .addCase(WallPaperList.pending, (state, action) => {
                state.loading = true

            })
            .addCase(WallPaperList.fulfilled, (state, action) => {
                state.loading = false;

            })
            .addCase(WallPaperList.rejected, (state, action) => {
                state.loading = false;
                state.error = handleUnauthorized(action.payload);
            })
            .addCase(ProductList.pending, (state, action) => {
                state.loading = true

            })
            .addCase(ProductList.fulfilled, (state, action) => {
                state.loading = false;

            })
            .addCase(ProductList.rejected, (state, action) => {
                state.loading = false;
                state.error = handleUnauthorized(action.payload);
            })
            .addCase(AddCart.pending, (state, action) => {
                state.loading = true

            })
            .addCase(AddCart.fulfilled, (state, action) => {
                state.loading = false;

            })
            .addCase(AddCart.rejected, (state, action) => {
                state.loading = false;
                state.error = handleUnauthorized(action.payload);
            })
            .addCase(getProductDetail.pending, (state, action) => {
                state.loading = true

            })
            .addCase(getProductDetail.fulfilled, (state, action) => {
                state.loading = false;

            })
            .addCase(getProductDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = handleUnauthorized(action.payload);
            })
            .addCase(MakePayment.pending, (state, action) => {
                state.loading = true

            })
            .addCase(MakePayment.fulfilled, (state, action) => {
                state.loading = false;

            })
            .addCase(MakePayment.rejected, (state, action) => {
                state.loading = false;
                state.error = handleUnauthorized(action.payload);
            })
            .addCase(VerifyPayment.pending, (state, action) => {
                state.loading = true

            })
            .addCase(VerifyPayment.fulfilled, (state, action) => {
                state.loading = false;

            })
            .addCase(VerifyPayment.rejected, (state, action) => {
                state.loading = false;
                state.error = handleUnauthorized(action.payload);
            })
            .addCase(getCartDetail.pending, (state, action) => {
                state.loading = true

            })
            .addCase(getCartDetail.fulfilled, (state, action) => {
                state.loading = false;

            })
            .addCase(getCartDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = handleUnauthorized(action.payload);
            })
            .addCase(DeleteCart.pending, (state, action) => {
                state.loading = true

            })
            .addCase(DeleteCart.fulfilled, (state, action) => {
                state.loading = false;

            })
            .addCase(DeleteCart.rejected, (state, action) => {
                console.log("DeleteCart", action)
                state.loading = false;
                state.error = handleUnauthorized(action.payload);
            })

            .addCase(CreateOrder.pending, (state, action) => {
                state.loading = true

            })
            .addCase(CreateOrder.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(CreateOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = handleUnauthorized(action.payload);
            })
            .addCase(GetUser.pending, (state, action) => {
                state.loading = true

            })
            .addCase(GetUser.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(GetUser.rejected, (state, action) => {
                state.loading = false;
                state.error = handleUnauthorized(action.payload);
            })
            .addCase(GetOrderById.pending, (state, action) => {
                state.loading = true

            })
            .addCase(GetOrderById.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(GetOrderById.rejected, (state, action) => {
                state.loading = false;
                state.error = handleUnauthorized(action.payload);
            })
            .addCase(UpdateUser.pending, (state, action) => {
                state.loading = true

            })
            .addCase(UpdateUser.fulfilled, (state, action) => {
                state.loading = false;

            })
            .addCase(UpdateUser.rejected, (state, action) => {
                console.log("UpdateUserError", action)
                state.loading = false;
                state.error = handleUnauthorized(action.payload);
            })
            .addCase(DeleteFullCart.pending, (state, action) => {
                state.loading = true

            })
            .addCase(DeleteFullCart.fulfilled, (state, action) => {
                state.loading = false;

            })
            .addCase(DeleteFullCart.rejected, (state, action) => {
                state.loading = false;
                state.error = handleUnauthorized(action.payload);
            })
            .addCase(GetCartMany.pending, (state, action) => {
                state.loading = true

            })
            .addCase(GetCartMany.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(GetCartMany.rejected, (state, action) => {
                state.loading = false;
                state.error = handleUnauthorized(action.payload);
            })
            .addCase(GetSingleCart.pending, (state, action) => {
                state.loading = true

            })
            .addCase(GetSingleCart.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(GetSingleCart.rejected, (state, action) => {
                state.loading = false;
                state.error = handleUnauthorized(action.payload);
            })
            .addCase(UpdateCartFlag.pending, (state, action) => {
                state.loading = true

            })
            .addCase(UpdateCartFlag.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(UpdateCartFlag.rejected, (state, action) => {
                state.loading = false;
                state.error = handleUnauthorized(action.payload);
            })
            .addCase(UpdateCart.pending, (state, action) => {
                state.loading = true

            })
            .addCase(UpdateCart.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(UpdateCart.rejected, (state, action) => {
                state.loading = false;
                state.error = handleUnauthorized(action.payload);
            })
            .addCase(GetLensType.pending, (state, action) => {
                state.loading = true

            })
            .addCase(GetLensType.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(GetLensType.rejected, (state, action) => {
                state.loading = false;
                state.error = handleUnauthorized(action.payload);
            })
            .addCase(GetBlog.pending, (state, action) => {
                state.loading = true
            })
            .addCase(GetBlog.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(GetBlog.rejected, (state, action) => {
                state.loading = false;
                state.error = handleUnauthorized(action.payload);
            })
            .addCase(GetLensDeatil.pending, (state, action) => {
                state.loading = true
            })
            .addCase(GetLensDeatil.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(GetLensDeatil.rejected, (state, action) => {
                state.loading = false;
                state.error = handleUnauthorized(action.payload);
            })

    }
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
