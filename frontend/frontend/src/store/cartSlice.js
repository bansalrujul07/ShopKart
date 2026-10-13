import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCart } from "../services/cartService";

export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async () => {
        const data = await getCart();
        return data.cart;
    }
);

const initialState = {
    items: [],
    loading: false,
    error: null
};

const cartSlice = createSlice({
    name: "cart",
    initialState,

    reducers: {
        setCart: (state, action) => {
            state.items = action.payload;
        },

        clearCart: (state) => {
            state.items = [];
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })

            .addCase(fetchCart.rejected, (state) => {
                state.loading = false;
                state.error = "Failed to fetch cart";
            });
    }
});

export const { setCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;