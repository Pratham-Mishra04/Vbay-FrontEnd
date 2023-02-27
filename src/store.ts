import { configureStore } from '@reduxjs/toolkit';
import productReducer from '@/slices/productSlice';
import productsReducer from '@/slices/productsSlice';

export const store = configureStore({
    reducer: {
        product: productReducer,
        products: productsReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;