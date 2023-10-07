'use client'

import { scarapeAndStoreProduct } from '@/lib/actions'
import React, { FormEvent, useState } from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import { FiLoader } from 'react-icons/fi'
import { toast } from 'react-toastify'

const isValidAmazonProductLink = (url: string) => {
    try {
        const parsedUrl = new URL(url)
        const hostname = parsedUrl.hostname
        if (hostname.includes('amazon.com') || hostname.includes('amazon.in') || hostname.includes('amazon.') || hostname.endsWith('amazon')) {
            return true
        }
        else {
            return false
        }
    } catch (error) {
        return false
    }
};

const SearchBar = () => {
    const [searchPrompt, setSearchPrompt] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const isValidLink = isValidAmazonProductLink(searchPrompt)
        if (!isValidLink) return toast.error('Please enter a valid Amazon product link', { position: "top-right" })
        try {
            setIsLoading(true);
            // Scraping logic here
            const product = await scarapeAndStoreProduct(searchPrompt);

        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form className='flex flex-wrap justify-center gap-[8px] sm:gap-4 mt-12'
            onSubmit={handleSubmit}
        >
            <input
                type='text'
                placeholder='Enter Product link...'
                className='w-5/6 sm:w-8/12 p-2 bg-slate-600 bg-opacity-40 backdrop-blur-sm rounded-md outline-none'
                value={searchPrompt}
                onChange={(e) => setSearchPrompt(e.target.value)}
            />
            <button
                disabled={isLoading || searchPrompt === ''}
                type='submit' className='flex items-center justify-center w-10 h-10 rounded-full bg-slate-600 bg-opacity-40 backdrop-blur-sm'>
                {
                    isLoading ? <FiLoader className="animate-spinSlow2 rounded-full h-6 w-6" /> : <BiSearchAlt className="absolute sm:flex nav_icon" />
                }
            </button>
        </form>
    )
}

export default SearchBar