import React, { ComponentType, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Toaster from './toaster';

const Protect = <Props extends Object>(Component: ComponentType<Props>) => {

    const ProtectedComponent = (props: Props) => {
        const router = useRouter();
        const [isAuthenticated, setIsAuthenticated] = useState(false)

        useEffect(() => {
            if (!Cookies.get('token')){
                Toaster.error("You are not logged in.")
                router.push('/login');
            }
            else setIsAuthenticated(true)
        }, []);

        if(isAuthenticated) return <Component {...props} />;
        return null;
    };
    return ProtectedComponent;
};

export default Protect;
