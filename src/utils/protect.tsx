import React, { ComponentType, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Toaster from './toaster';

const Protect = <P extends Object>(Component: ComponentType<P>) => {
    const ProtectedComponent = (props: P) => {
        const router = useRouter();

        useEffect(() => {
            if (!Cookies.get('token')){
                Toaster.error("You are not logged in.")
                router.push('/login');
            }
        }, []);

        return <Component {...props} />;
    };

    return ProtectedComponent;
};

export default Protect;
