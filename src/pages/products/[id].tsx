import axios from 'axios';
import { DEV_BACKEND_URL } from '@/../constants';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Cookies from 'js-cookie';
export interface Product {
    product: {
        _id:string
        title: string;
        listedBy: string;
        leastAsked: number;
        description: string;
        images: string[];
    };
}

const Product = ({ product }: Product) => {
    const { _id, images, title, listedBy, leastAsked, description } = product;
    const userID = Cookies.get('id')

    return (
        <>
            <div className=" flex flex-col items-center justify-center max-w-7xl px-4 sm:px-6 lg:px-8 mt-6 md:flex-row">
                <div className="md:flex-1 px-4">
                    <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
                        {images.map((el: string, index: number) => {
                            return (
                                <Image
                                    width={1000}
                                    height={1000}
                                    src={`${DEV_BACKEND_URL}/${el}`}
                                    key={index}
                                    className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center"
                                    alt={''}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className="md:flex-1 px-4">
                    {
                        (listedBy===userID)?<Link href={`/products/edit/${_id}`}>
                        Edit
                </Link>:''
                    }
                
                    <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
                        {title}
                    </h2>
                    <p className="text-gray-500 text-sm">
                        By{' '}
                        <a href="#" className="text-indigo-600 hover:underline">
                            {listedBy}
                        </a>
                    </p>

                    <div className="flex items-center space-x-4 my-4">
                        <div>
                            <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                                <span className="text-indigo-400 mr-1 mt-1">
                                    Rs.
                                </span>
                                <span className="font-bold text-indigo-600 text-3xl">
                                    {leastAsked}
                                </span>
                            </div>
                        </div>
                    </div>

                    <p className="text-gray-500">{description}</p>

                    <div className="flex py-4 space-x-4">
                        <button
                            type="button"
                            className="h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            
            </div>
        </>
    );
};

export async function getServerSideProps(context) {
    const { id } = context.query;
    const URL = `${DEV_BACKEND_URL}/products/${id}`;
    try {
        const res = await axios.get(URL);
        const product = res.data.data;
        return {
            props: { product },
        };
    } catch (err) {
        //log the error
        return {
            props: {},
        };
    }
}

export default Product;
