import Landing from '@/screens/Landing';
import axios from 'axios';
import Cookies from 'js-cookie';
import { DEV_BACKEND_URL } from '@/../constants';
import Toaster from '@/utils/toaster';
import Error from '@/screens/Error';
import ProductCard from '@/components/productCard';
import { ProductState } from '@/slices/productSlice';
import { useSelector, useDispatch } from 'react-redux';
import { productsSelector, setProducts } from '@/slices/productsSlice';
import { useEffect } from 'react';
import SearchBox from '@/components/searchBox';

interface queryParams {
    products: ProductState[];
}

export default function Home({ products }: queryParams) {
    const token = Cookies.get('token')
        ? Cookies.get('token')
        : Cookies.get('guestToken')
        ? Cookies.get('guestToken')
        : '';

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setProducts(products));
    }, []);

    const allProducts = useSelector(productsSelector);

    if (token === '') return <Landing />;
    if (!allProducts) {
        Toaster.error('Error Loading the Products');
        return <Error />;
    }

    return (
        <>
            <SearchBox />
            <div className="p-4">
                <div className="text-5xl flex justify-center items-center p-8 font-semibold">
                    Products In Store
                </div>
                <div className="flex w-full gap-8 p-10 justify-center items-center flex-wrap">
                    {allProducts.map((el) => {
                        return (
                            <ProductCard
                                id={el._id}
                                title={el.title}
                                description={el.description}
                                img={el.images[0] ? el.images[0] : ''}
                                key={el._id}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps() {
    const URL = `${DEV_BACKEND_URL}/shop/guest`;
    try {
        const res = await axios.get(URL);
        const products = res.data.products;
        return {
            props: { products },
        };
    } catch (err) {
        //log the error
        return {
            props: {},
        };
    }
}
