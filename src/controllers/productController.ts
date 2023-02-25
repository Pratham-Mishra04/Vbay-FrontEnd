import getHandler from '@/handlers/getHandler.js';
import postHandler from '@/handlers/postHandler.js';
import Toaster from '@/utils/toaster.js';
import envHandler from '@/managers/envHandler.js';

const URL = `${envHandler('BACKEND_URL')}/products`;

export const getAllItems = async () => {
    const loader = Toaster.startLoad('Loading your Products..');
    const res = await getHandler(`${URL}/`, false);

    if (res.status === 1) {
        Toaster.stopLoad(loader, 'Products loaded', 1);
        return res.data.products;
    } else Toaster.stopLoad(loader, res.data.message, 0);
};

export const getItem = (id: string) => async () => {
    const loader = Toaster.startLoad('Loading your Product..');
    const res = await getHandler(`${URL}/${id}`, false);

    if (res.status === 1) {
        Toaster.stopLoad(loader, 'Loaded', 1);
        return res.data.product;
    } else Toaster.stopLoad(loader, res.data.message, 0);
};

export const addItem = async (formData: object) => {
    const loader = Toaster.startLoad('Adding your Product..');
    const res = await postHandler(`${URL}/`, formData, true);

    if (res.status === 1) {
        Toaster.stopLoad(loader, 'Product added', 1);
        return res.data.products;
    } else Toaster.stopLoad(loader, res.data.message, 0);
};
