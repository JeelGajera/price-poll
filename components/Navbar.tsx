import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import {BiSearchAlt, BiUserCircle} from 'react-icons/bi';
import { AiOutlineHeart } from 'react-icons/ai';

const navIcons = [
    {
        comp: <BiSearchAlt className="nav_icon"/>, alt: 'search'
    },
    {
        comp: <AiOutlineHeart className="nav_icon"/>, alt: 'wishlist'
    },
    {
        comp: <BiUserCircle className="nav_icon"/>, alt: 'profile'
    }
]

const Navbar = () => {
    return (
        <header className='w-full'>
            <nav className='flex justify-between items-center'>
                <Link href='/' className='flex items-center nav_link w-fit gap-1'>
                    <div className='w-12 h-12'>
                        <Image
                            src='/assets/images/logo.png'
                            alt='home_logo'
                            width={500}
                            height={500}
                        />
                    </div>
                    <p className='hover:text-teal-500'>Price <span className='text-red-500 hover:text-white'>Poll</span></p>
                </Link>
                <div className='flex items-center gap-2 sm:gap-5 m-2'>
                    {navIcons.map((icon,index) => (
                        <div key={index} className='flex items-center justify-center w-10 h-10 rounded-full bg-white bg-opacity-10 backdrop-blur-lg'>
                            {icon.comp}
                        </div>
                    )
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar; 