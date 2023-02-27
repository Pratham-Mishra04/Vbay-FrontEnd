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

const initialState: ProductState = {
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
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProduct: (state, action: PayloadAction<ProductState>) => {
            state._id = action.payload._id;
            state.title = action.payload.title;
            state.listedBy = action.payload.listedBy;
            state.leastAsked = action.payload.leastAsked;
            state.description = action.payload.description;
            state.images = action.payload.images;
            state.bids = action.payload.bids;
        },
        setBids: (state, action: PayloadAction<Bid[]>) => {
            state.bids= action.payload
        },
    },
});

export const { setProduct, setBids } = productSlice.actions;

export default productSlice.reducer;

export const productSelector = (state: RootState) => state.product;
