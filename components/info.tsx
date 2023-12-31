"use client";

import { Product } from '@/types'
import React, { MouseEventHandler } from 'react'
import Currency from './ui/currency'
import { Button } from './ui/button'
import { ShoppingCart } from 'lucide-react';
import useCart from '@/hooks/use-cart';
interface InfoProps {
    data: Product
}
const Info: React.FC<InfoProps> = ({
    data
}) => {
    const cart = useCart();
    const onAddToCart:MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
    
        cart.addItem(data);
      }
  return (
    <div>
        <h1 className='text-3xl font-bold text-gray-900'>{data.name}</h1>
        <div className='mt-3 flex items-end justify-between'>
            <p className='text-2xl text-gray-900'>
                <Currency value={data?.price}/>
            </p>
        </div>
        <hr className='my-4' />
        <div className='flex flex-col gap-y-6'>
        <div className='flex items-center gap-x-4'>
            <h3 className='font-semibold text-black'>Size:</h3>
            <div className='dark:text-black'>
                {data?.size?.value}
            </div>
        </div>
        <div className='flex items-center gap-x-4'>
            <h3 className='font-semibold text-black'>Color:</h3>
            <div className='h-6 w-6 rounded-full border-gray-50' style={{backgroundColor: data?.color?.value}} />
        </div>
        </div>
        <div className='mt-10 flex items-center gap-x-3'>
            <Button onClick={onAddToCart} className='flex bg-slate-300 hover:bg-slate-200 text-black items-center dark:bg-slate-400 gap-x-2 dark:hover:bg-slate-200'>
                Add to cart 
                <ShoppingCart className='h-4 w-4'/>
            </Button>
        </div>
    </div>
  )
}

export default Info