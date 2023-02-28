import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';

interface Bid {
    _id: string;
    placedBy: listedBy;
    product: string;
    bid: number;
}

interface listedBy {
    id: string;
    username: string;
}

export interface ProductState {
    _id: string;
    title: string;
    listedBy: listedBy;
    leastAsked: number;
    description: string;
    images: string[];
    bids: Bid[];
}

interface State{
    product:ProductState,
    allProducts:ProductState[]
}

const initialState: State = {
    product:{
        _id: '',
        title: '',
        listedBy: {
            id: '',
            username: '',
        },
        leastAsked: 0,
        description: '',
        images: [],
        bids: [],
    },
    allProducts:[]
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProduct: (state, action: PayloadAction<ProductState>) => {
            state.product._id = action.payload._id;
            state.product.title = action.payload.title;
            state.product.listedBy = action.payload.listedBy;
            state.product.leastAsked = action.payload.leastAsked;
            state.product.description = action.payload.description;
            state.product.images = action.payload.images;
            state.product.bids = action.payload.bids;
        },
        setBids: (state, action: PayloadAction<Bid[]>) => {
            state.product.bids= action.payload
        },
        setAllProducts: (state, action: PayloadAction<ProductState[]>) => {
            state.allProducts=action.payload
        },
    },
});

export const { setProduct, setBids, setAllProducts } = productSlice.actions;

export default productSlice.reducer;

export const productSelector = (state: RootState) => state.product.product;

export const allProductsSelector = (state: RootState) => state.product.allProducts;
