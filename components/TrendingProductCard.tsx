'use client'

import React from 'react'
import Image from 'next/image';
import { Product } from '@/types';
import Link from 'next/link';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { formatNumber } from '@/lib/utils';


const TrendingProductCard = ({ product }: { product: Product }) => {
    return (
        <Link href={`products/${product._id}`} >
            <Card key={product._id} className='shadow-slate-600'>
                <CardHeader>
                    <CardDescription>
                    <p>Price: {formatNumber(product.currentPrice)} {product.currency}</p></CardDescription>
                </CardHeader>
                <CardContent className='h-60 flex justify-center items-center'>
                    <Image
                        src={product.image}
                        alt={product.title}
                        width={200}
                        height={200}
                        className='h-60 rounded-md object-cover'
                    />
                </CardContent>
                <CardFooter>
                {product.title.slice(0, 90) + "..."}
                </CardFooter>
            </Card>
        </Link>
    )
}

export default TrendingProductCard