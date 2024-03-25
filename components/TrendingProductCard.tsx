'use client'

import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import { Product } from '@/types';

const TrendingProductCard = ({ product }: { product: Product }) => {
    return (
        <div key={product._id} className='relative bg-black bg-opacity-20 backdrop-blur-md rounded-xl border-teal-500 border-l-[1px] border-t-red-500 border-t-[1px] p-2 w-60  '>
            <div className='w-60 h-40 carousel_img'>
                <Image
                    src={product.image}
                    alt={product.title}
                    width={200}
                    height={200}
                    className='rounded-md object-contain'
                />
            </div>
            <div className='absolute bottom-0 bg-black from-black to-transparent bg-opacity-30 backdrop-blur-md rounded-xl'>
                <p className='text-md decoration-red-500 underline underline-offset-2'>Price: {product.currentPrice}</p>
                <h3 className='text-sm '>{product.title.slice(0, 55) + "..."}</h3>
            </div>
        </div>
    )
}

export default TrendingProductCard