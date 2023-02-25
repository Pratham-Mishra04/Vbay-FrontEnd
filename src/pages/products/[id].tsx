import axios from 'axios';
import { DEV_BACKEND_URL } from '@/../constants';
import React from 'react';
import Image from 'next/image';

const Product = ({ product }) => {
    return (
        <>
            <div className="antialiased">
                <div className="py-6">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                        <div className="flex flex-col md:flex-row -mx-4">
                            <div className="md:flex-1 px-4">
                                <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
                                    {product.images
                                        ? product.images.map(
                                            (el: string, index: number) => {
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
                                            }
                                        )
                                        : ''}
                                </div>
                            </div>
                            <div className="md:flex-1 px-4">
                                <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
                                    {product.title}
                                </h2>
                                <p className="text-gray-500 text-sm">
                                    By{' '}
                                    <a
                                        href="#"
                                        className="text-indigo-600 hover:underline"
                                    >
                                        {product.listedBy}
                                    </a>
                                </p>

                                <div className="flex items-center space-x-4 my-4">
                                    <div>
                                        <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                                            <span className="text-indigo-400 mr-1 mt-1">
                                                Rs.
                                            </span>
                                            <span className="font-bold text-indigo-600 text-3xl">
                                                {product.leastAsked}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-gray-500">
                                    {product.description}
                                </p>

                                <div className="flex py-4 space-x-4">
                                    <button
                                        type="button"
                                        className="h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
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
