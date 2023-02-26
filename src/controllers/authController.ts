import postHandler from '@/handlers/postHandler';
import Toaster from '@/utils/toaster';
import envHandler from '@/managers/envHandler';
import Cookies from 'js-cookie';
import { catchPostAsync } from '@/managers/catchAsync';
import { DEV_BACKEND_URL } from '@/../constants';

// const URL = `${envHandler('BACKEND_URL')}/users`;

const URL = `${DEV_BACKEND_URL}/users`;

export const signup = async (formData: object): Promise<0 | 1> => {
    const loader = Toaster.startLoad('Creating your Account..');
    try {
        const res = await postHandler(`${URL}/signup`, formData, false);
        if (res.status === 1) {
            Toaster.stopLoad(loader, 'Account Created', 1);
            Cookies.set('token', res.data.token, {
                // expires: Number(envHandler('TOKEN_TIME')),
                expires: 90,
            });
            Cookies.set('id', res.data.user._id, {
                // expires: Number(envHandler('TOKEN_TIME')),
                expires: 90,
            });
            return 1;
        } else Toaster.stopLoad(loader, res.data.message, 0);
        return 0;
    } catch (err) {
        console.log(err);
        Toaster.stopLoad(loader, 'Internal Server Error', 0); //Make Separate Error Handler for this
        return 0;
    }
};

export const login = async (formData: object): Promise<0 | 1> => {
    const toaster = Toaster.startLoad('Logging In');
    try {
        const res = await postHandler(`${URL}/login`, formData, false);
        if (res.status === 1) {
            Toaster.stopLoad(toaster, 'Logged In!', 1);
            Cookies.set('token', res.data.token, {
                // expires: Number(envHandler('TOKEN_TIME')),
                expires: 90,
            });
            Cookies.set('id', res.data.user._id, {
                // expires: Number(envHandler('TOKEN_TIME')),
                expires: 90,
            });
            return 1;
        } else Toaster.stopLoad(toaster, res.data.message, 0);
        return 0;
    } catch (err) {
        Toaster.stopLoad(toaster, 'Internal Server Error', 0); //Make Separate Error Handler for this
        return 0;
    }
};
