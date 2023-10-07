import HeroCarousel from '@/components/HeroCarousel'
import SearchBar from '@/components/SearchBar'
import Image from 'next/image'
import React from 'react'

const Home = () => {
  return (
    <>
      <section id='animated_section' className='flex flex-col sm:flex-row justify-center items-center gap-8 mb-10 h-96 overflow-hidden'>
        <div className='flex flex-col gap-2 sm:w-5/12 sm:h-72 p-4 bg-black bg-opacity-40 backdrop-blur-md rounded-md border-red-500 border-b-[1px]'>
          <p className='text-sm'>Your Ultimate Price Tracking Companion <span className='animate-pulse'>🤖</span></p>

          <h1 className='text-3xl sm:text-4xl font-semibold'>Unleash the power of <span className='text-red-500'>Price&nbsp;Poll</span></h1>
          <p className='text-sm text-slate-300'>
            Price Poll is your all-in-one price tracking solution. Whether you're hunting for electronics, fashion, appliances, or anything in between, PricePol has got you covered.
          </p>
          <SearchBar />
        </div>
        <div className='relative hidden sm:flex w-80 h-72'>
          <HeroCarousel />
          <Image
            src={'/assets/images/arrow.svg'}
            alt={'arrow'}
            width={140}
            height={140}
            className='z-10 absolute -bottom-1 -left-20 transform rotate-[200deg] -translate-x-6 translate-y-10'
          />
        </div>
      </section>
      <div className='flex sm:hidden justify-center items-center mb-12'>
        <HeroCarousel i={2} />
      </div>
    </>
  )
}

export default Home