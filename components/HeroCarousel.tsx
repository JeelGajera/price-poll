'use client'

import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';

const heroImages = [
    {
        imgUrl: '/assets/images/hero-1.svg', alt: "smartwatch"
    },
    {
        imgUrl: '/assets/images/hero-2.svg', alt: "hand-bag"
    },
    {
        imgUrl: '/assets/images/hero-3.svg', alt: "table-lamp"
    },
    {
        imgUrl: '/assets/images/hero-4.svg', alt: "smartwatch"
    },
    {
        imgUrl: '/assets/images/hero-5.svg', alt: "chair"
    }
]

const HeroCarousel = ({ i = 1 }) => {
    return (
        <div className='w-60'>
            <Carousel
                autoPlay={true}
                showThumbs={false}
                infiniteLoop={true}
                interval={3000}
                showArrows={false}
                showStatus={false}
                dynamicHeight={false}
            >
                {
                    heroImages.map((img, index) => (
                        <div key={index * i} className='bg-black bg-opacity-20 backdrop-blur-md rounded-xl border-teal-500 border-l-[1px] border-t-red-500 border-t-[1px] p-2 w-60 h-72'>
                            <Image
                                src={img.imgUrl}
                                alt={img.alt}
                                width={484}
                                height={484}
                                className='object-contain'
                            />
                        </div>
                    ))
                }
            </Carousel>
        </div>
    )
}

export default HeroCarousel