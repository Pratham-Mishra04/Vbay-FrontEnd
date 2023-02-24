import axios from 'axios';
import Cookies from 'js-cookie';
import res from '@/types/res';

const getHandler = async (URL: string, protect: boolean) => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: '',
    };
    if (protect) headers.Authorization = `Bearer ${Cookies.get('token')}`;
    const response:any = {
        status: 0,
        data: '',
    };
    await axios
        .get(URL, { headers })
        .then((res) => {
            response.status = 1;
            response.data = res.data;
        })
        .catch((err) => {
            response.status = 0;
            response.data = err.response.data;
        });
    return response;
};

export default getHandler;
