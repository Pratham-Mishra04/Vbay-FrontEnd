import postHandler from '../handlers/postHandler';
import Toaster from '../utils/toaster';
import envHandler from '../managers/envHandler';
import Cookies from 'js-cookie';
import { catchPostAsync } from '@/managers/catchAsync';

const URL = `${envHandler('BACKEND_URL')}/users`;

export const signup = catchPostAsync(async (formData: object) => {
  const loader = Toaster.startLoad('Creating your Account..');
  const res = await postHandler(`${URL}/signup`, formData, false);
  if (res.status === 1) {
    Toaster.stopLoad(loader, 'Account Created', 1);
    Cookies.set('token', res.data.token, {
      expires: Number(envHandler('TOKEN_TIME')),
    });
    Cookies.set('id', res.data.user.user_id, {
      expires: Number(envHandler('TOKEN_TIME')),
    });
    return 1;
  } else Toaster.stopLoad(loader, res.data.message, 0);
  return 0;
});

export const login = catchPostAsync(async (formData: object) => {
  const res = await postHandler(`${URL}/login`, formData, false);
  if (res.status === 1) {
    Toaster.success('Logged In!');
    Cookies.set('token', res.data.token, {
      expires: Number(envHandler('TOKEN_TIME')),
    });
    Cookies.set('id', res.data.user.user._id, {
      expires: Number(envHandler('TOKEN_TIME')),
    });
    return 1;
  } else Toaster.error(res.data.message);
  return 0;
});
