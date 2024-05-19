import { getProductById } from '@/lib/actions';
import { Product } from '@/types';
import { redirect } from 'next/navigation';
import React from 'react'
import Image from "next/image"
import Link from 'next/link';
import { badgeVariants } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { formatNumber } from '@/lib/utils';
import PriceInfoCard from '@/components/PriceInfoCard';


type Props = {
  params: { id: string }
}


const ProductDetails = async ({ params: { id } }: Props) => {
  const product: Product = await getProductById(id);
  if (!product) redirect("/");

  return (
    <div className='flex flex-col gap-4 p-4'>
      <div className='flex flex-col lg:flex-row gap-4'>
        <div className="">
          <Image src={product.image} width={580} height={400} alt={product.title} className="w-[580px] h-[400px]  rounded-md object-contain mx-auto" />
        </div>
        <div className='flex-1 flex flex-col mr-5'>
          <div className='flex justify-between items-start gap-5 flex-wrap pb-6'>
            <p className='text-secondary-foreground text-lg font-semibold'>{product.title}</p>
            <Link href={product.url} target="_blank" className={badgeVariants({ variant: "outline" }) + ' border-teal-500'}>🛍️ Visit Product</Link>
          </div>
          <div className='flex items-center gap-3'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="outline" className='px-4 rounded-full border-white' >💬 {product.reviewsCount}</Button>
                </TooltipTrigger>
                <TooltipContent> {product.reviewsCount} reviews are given to this product</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="outline" className='px-4 rounded-full border-red-500 text-lg' ><Image src={"https://img.icons8.com/fluency/48/bookmark-ribbon.png"} width={24} height={24} alt='bookmark' /></Button>
                </TooltipTrigger>
                <TooltipContent>Bookmark</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="outline" className='px-4 rounded-full border-blue-600 text-lg' ><Image src={"https://img.icons8.com/fluency/48/share--v2.png"} width={24} height={24} alt='share' /></Button>
                </TooltipTrigger>
                <TooltipContent>Share</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="outline" className='px-4 rounded-full border-yellow-500 text-lg' ><Image width={24} height={24} src="https://img.icons8.com/3d-fluency/94/star.png" alt="star" className='mr-1' /> {product.stars ?? 0}</Button>
                </TooltipTrigger>
                <TooltipContent>Star</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className='flex flex-col gap-3 mt-4'>
            <div className='text-[34px] text-secondary-foreground font-semibold '>{product.currency} {formatNumber(product.currentPrice)}</div>
            <div className='text-2xl line-through text-gray-500 font-medium '>{product.currency} {formatNumber(product.originalPrice)}</div>
          </div>
          <div className='grid grid-cols-2 gap-4 mt-5'>
            <PriceInfoCard
              tag="Current Price"
              currency={product.currency}
              value={product.currentPrice}
              iconSrc="https://img.icons8.com/fluency/48/price-tag.png"
            />
            <PriceInfoCard
              tag="Average Price"
              currency={product.currency}
              value={product.averagePrice}
              iconSrc="https://img.icons8.com/fluency/48/combo-chart--v1.png"
            />
            <PriceInfoCard
              tag="Highest Price"
              currency={product.currency}
              value={product.highestPrice ? product.highestPrice : product.originalPrice}
              iconSrc="https://img.icons8.com/3d-fluency/94/up.png"
            />
            <PriceInfoCard
              tag="Lowest Price"
              currency={product.currency}
              value={product.lowestPrice}
              iconSrc="https://img.icons8.com/3d-fluency/94/down.png"
            />
          </div>
          <div className='flex justify-center items-center mt-4'>
          <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="outline" className='px-4 rounded-full border-teal-500 text-xl' ><Image width={24} height={24} src="https://img.icons8.com/3d-fluency/94/adventure.png" alt="adventure"/>&nbsp;Track</Button>
                </TooltipTrigger>
                <TooltipContent>Track your Product Price & Get Notification for price changes!</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-4 mt-5'>
        <p className='text-2xl font-semibold'>📃 Description</p>
        <p className='text-gray-500 text-justify mx-5'>{product.description}</p>
      </div>
    </div>
  )
}

export default ProductDetails