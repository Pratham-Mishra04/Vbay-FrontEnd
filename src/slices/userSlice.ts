import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { ProductState } from './productSlice';

export interface UserState {
    _id:string
    email: string,
    name: string,
    profilePic:string,
    regNo:string,
    username:string,
    phoneNo:string,
    products: ProductState[]
}

const initialState: UserState = {
    _id:'',
    email: '',
    name: '',
    profilePic:'',
    regNo:'',
    username:'',
    phoneNo:'',
    products:[]
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state._id = action.payload._id;
            state.email = action.payload.email;
            state.name = action.payload.name;
            state.profilePic = action.payload.profilePic;
            state.regNo = action.payload.regNo;
            state.username = action.payload.username;
            state.phoneNo = action.payload.phoneNo;
        },
        setUserProducts: (state, action: PayloadAction<ProductState[]>) => {
            state.products=action.payload
        },
    },
});

export const { setUser, setUserProducts } = userSlice.actions;

export default userSlice.reducer;

export const userSelector = (state: RootState) => state.user;
