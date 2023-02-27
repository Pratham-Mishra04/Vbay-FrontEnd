import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import { DEV_BACKEND_URL } from '@/../constants';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { deleteBid, placeBid } from '@/controllers/productController';
export interface Product {
    product: {
        _id: string;
        title: string;
        listedBy: listedBy;
        leastAsked: number;
        description: string;
        images: string[];
        bids: Bid[];
    };
}

export interface Bid {
    _id: string;
    placedBy: listedBy;
    product: string;
    bid: number;
}

interface listedBy {
    id: string;
    username: string;
}

const Product = ({ product }: Product) => {
    const [bid, setBid] = useState(0);
    const [isPlaced, setIsPlaced] = useState(false);

    const { _id, images, title, listedBy, leastAsked, description, bids } =
        product;

    const userID = Cookies.get('id');

    useEffect(() => {
        bids.forEach((el) => {
            if (el.placedBy.id === userID) {
                setIsPlaced(true);
                setBid(el.bid);
            }
        });
    }, [bids]);

    const bidHandler = async (contol: number) => {
        if (contol === 1) {
            const formData = {
                bid,
            };
            await placeBid(formData, _id);
        } else await deleteBid(_id);
    };

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
                    <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
                        {title}
                    </h2>
                    <p className="text-gray-500 text-sm">
                        By{' '}
                        <a href="#" className="text-indigo-600 hover:underline">
                            {listedBy.username}
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
                        {listedBy.id === userID ? (
                            <Link href={`/products/edit/${_id}`}>
                                <button
                                    type="button"
                                    className="h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
                                >
                                    Edit
                                </button>
                            </Link>
                        ) : (
                            <Link href={``}>
                                <button
                                    type="button"
                                    className="h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
                                >
                                    Buy Now
                                </button>
                            </Link>
                        )}
                    </div>
                    {Cookies.get('token') && listedBy.id !== userID ? (
                        <>
                            <div className="flex my-8">
                                <div className="text-4xl font-semibold underline">
                                    Bids
                                </div>
                                <div></div>
                            </div>
                            {bids.length > 0 ? (
                                <>
                                    <div>List of Bids</div>
                                    <div>
                                        {bids.map((el: Bid, index: number) => {
                                            return (
                                                <div key={index}>
                                                    {el.bid} by{' '}
                                                    {el.placedBy.username}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    {isPlaced ? (
                                        <>
                                            <input
                                                type="number"
                                                placeholder={String(bid)}
                                                onChange={(el) => {
                                                    setBid(
                                                        Number(el.target.value)
                                                    );
                                                }}
                                            />
                                            <button
                                                onClick={() => {
                                                    bidHandler(1);
                                                }}
                                                className="w-full focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-purple-500 hover:bg-purple-600 hover:shadow-lg"
                                            >
                                                Edit Your Bid
                                            </button>
                                            <button
                                                onClick={() => {
                                                    bidHandler(0);
                                                }}
                                                className="w-full focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-purple-500 hover:bg-purple-600 hover:shadow-lg"
                                            >
                                                Delete Your Bid
                                            </button>
                                        </>
                                    ) : (
                                        ''
                                    )}
                                </>
                            ) : (
                                <>
                                    <input
                                        type="number"
                                        placeholder="Place your Bid"
                                        onChange={(el) => {
                                            setBid(Number(el.target.value));
                                        }}
                                    />
                                    <button
                                        onClick={() => {
                                            bidHandler(1);
                                        }}
                                        className="w-full focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-purple-500 hover:bg-purple-600 hover:shadow-lg"
                                    >
                                        Place Your Bid
                                    </button>
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            <div className="flex my-8">
                                <div className="text-4xl font-semibold underline">
                                    Bids
                                </div>
                                <div></div>
                            </div>
                            {bids.length > 0 ? (
                                <>
                                    <div>List of Bids</div>
                                    <div>
                                        {bids.map((el: Bid, index: number) => {
                                            return (
                                                <div key={index}>
                                                    {el.bid} by{' '}
                                                    {el.placedBy.username}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>No Bids Yet</div>
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { id } = context.query;
    const URL = `${DEV_BACKEND_URL}/products/${id}`;
    try {
        const res = await axios.get(URL);
        const product = res.data.product;
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
