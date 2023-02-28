import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { DEV_BACKEND_URL } from '@./../constants';
import { useDispatch, useSelector } from 'react-redux';
import { allProductsSelector, setAllProducts } from '@/slices/productSlice';
import Toaster from '@/utils/toaster';

const SearchBox = () => {
    const [search, setSearch] = useState('');
    const [newProducts, setNewProducts] = useState(
        useSelector(allProductsSelector)
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setAllProducts(newProducts));
    }, [newProducts]);

    const SubmitHandler = async () => {
        try {
            const URL = `${DEV_BACKEND_URL}/shop/guest?search=${search}`;
            const res = await axios.get(URL);
            const products = res.data.products;
            setNewProducts(products);
        } catch (err) {
            Toaster.error('Error Loading the Products');
        }
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) =>{
        if(event.key==='Enter') SubmitHandler()
    }
    
    return (
        <div className="flex justify-center">
            <div className="mb-3 xl:w-96">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <input
                        type="search"
                        className="relative m-0 block w-[1%] bg-black my-4 min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out focus:border-primary-600 focus:text-stone-500 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="button-addon2"
                        onChange={(el) => {
                            setSearch(el.target.value);
                        }}
                        onKeyDown={onKeyDown}
                    />
                    <button
                        className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
                        id="basic-addon2"
                        onClick={SubmitHandler}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="black"
                            className="h-5 w-5"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchBox;
