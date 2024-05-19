"use client"

import React from 'react'
import Image from 'next/image'
import { formatNumber } from '@/lib/utils'

type Props = {
    tag: string
    currency: string
    value: number
    iconSrc: string
}

const PriceInfoCard = (props: Props) => {
    return (
        <div className='flex-1 flex flex-col border-[0.5px] border-slate-300 p-5 bg-white rounded-lg bg-opacity-10 backdrop-blur-md'>
            <p className='text-lg font-semibold'>{props.tag}</p>
            <div className='flex gap-2'>
                <Image width={24} height={24} src={props.iconSrc} alt={props.tag} />
                <p className='text-slate-300'>{props.currency} {formatNumber(props.value)}</p>
            </div>
        </div>
    )
}

export default PriceInfoCard