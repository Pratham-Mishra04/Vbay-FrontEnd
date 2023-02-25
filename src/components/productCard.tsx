import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { DEV_BACKEND_URL } from '@/../constants';

interface ProductCardProps {
    id: string;
    title: string;
    img: string;
    description: string;
}

const ProductCard = ({ id, title, img, description }: ProductCardProps) => {
    return (
        <Link href={`/products/${id}`}>
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <Image
                    width={100000}
                    height={100000}
                    className="rounded-t-lg"
                    src={`${DEV_BACKEND_URL}/${img}`}
                    alt=""
                />
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {title}
                        </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {description}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
