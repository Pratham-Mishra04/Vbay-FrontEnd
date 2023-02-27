import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { ProductState } from './productSlice';

interface query{
    allProducts:ProductState[]
}

const initialState:query = {
    allProducts:[]
};

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<ProductState[]>) => {
            state.allProducts=action.payload
        },
    },
});

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;

export const productsSelector = (state: RootState) => state.products.allProducts;
