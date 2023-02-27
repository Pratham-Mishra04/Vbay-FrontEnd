import postHandler from '@/handlers/postHandler';
import Toaster from '@/utils/toaster';
import envHandler from '@/managers/envHandler';
import { DEV_BACKEND_URL } from '@/../constants';
import patchHandler from '@/handlers/patchHandler';
import deleteHandler from '@/handlers/deleteHandler';

// const URL = `${envHandler('BACKEND_URL')}/products`;

const URL = `${DEV_BACKEND_URL}/products`;

export const addItem = async (formData: object) => {
    const toaster = Toaster.startLoad('Adding your Product');
    try {
        const res = await postHandler(`${URL}/`, formData, true, 'multipart/form-data');
        if (res.status === 1) {
            Toaster.stopLoad(toaster, 'Product Added', 1);
            return 1;
        } else Toaster.stopLoad(toaster, res.data.message, 0);
        return 0;
    } catch (err) {
        Toaster.stopLoad(toaster, 'Internal Server Error', 0); //Make Separate Error Handler for this
        return 0;
    }
};

export const editItem = async (formData: object, id:string) => {
    const toaster = Toaster.startLoad('Editing your Product');
    try {
        const res = await patchHandler(`${URL}/${id}`, formData, true, 'multipart/form-data');
        if (res.status === 1) {
            Toaster.stopLoad(toaster, 'Product Edited', 1);
            return 1;
        } else Toaster.stopLoad(toaster, res.data.message, 0);
        return 0;
    } catch (err) {
        Toaster.stopLoad(toaster, 'Internal Server Error', 0); //Make Separate Error Handler for this
        return 0;
    }
};

export const placeBid = async (formData: object, id:string) => {
    const toaster = Toaster.startLoad('Placing your Bid');
    try {
        const res = await postHandler(`${DEV_BACKEND_URL}/shop/${id}/bid`, formData, true);
        if (res.status === 1) {
            Toaster.stopLoad(toaster, 'Bid Placed', 1);
        } else Toaster.stopLoad(toaster, res.data.message, 0);
        return res.data.bids;
    } catch (err) {
        Toaster.stopLoad(toaster, 'Internal Server Error', 0); //Make Separate Error Handler for this
        return 0;
    }
};

export const deleteBid = async (id:string) => {
    const toaster = Toaster.startLoad('Deleting your Bid');
    try {
        const res = await deleteHandler(`${DEV_BACKEND_URL}/shop/${id}/bid`);
        if (res.status === 1) {
            Toaster.stopLoad(toaster, 'Bid Deleted', 1);
        } else Toaster.stopLoad(toaster, res.data.message, 0);
        return res.data.bids;
    } catch (err) {
        Toaster.stopLoad(toaster, 'Internal Server Error', 0); //Make Separate Error Handler for this
        return 0;
    }
};