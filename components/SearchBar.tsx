'use client'

import React from 'react'
import { BiSearchAlt } from 'react-icons/bi'

const SearchBar = () => {

    const handleSubmit = () => {
    }
    return (
        <form className='flex flex-wrap justify-center gap-[8px] sm:gap-4 mt-12'
            onSubmit={handleSubmit}
        >
            <input
                type='text'
                placeholder='Enter Product link...'
                className='w-5/6 sm:w-8/12 p-2 bg-slate-600 bg-opacity-40 backdrop-blur-sm rounded-md' />
            <button 
                type='submit' className='flex items-center justify-center w-10 h-10 rounded-full bg-slate-600 bg-opacity-40 backdrop-blur-sm'>
                <BiSearchAlt className="absolute sm:flex nav_icon" />
            </button>
        </form>
    )
}

export default SearchBar