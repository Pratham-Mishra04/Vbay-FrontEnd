import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const Protect=()=>{
    const router = useRouter();
    if(!Cookies.get('token')) router.push('/login')
}

export default Protect