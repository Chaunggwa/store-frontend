"use client";

import { Product } from '@/types';
import Image from 'next/image';
import React, { MouseEventHandler } from 'react'
import IconButton from './icon-button';
import { Expand, ShoppingCart } from 'lucide-react';
import Currency from './currency';
import { useRouter } from 'next/navigation';
import PreviewModal from '../preview-modal';
import usePreviewModal from '@/hooks/use-preview-modal';
import useCart from '@/hooks/use-cart';

interface ProductCard{
  data: Product
}
const ProductCard: React.FC<ProductCard> = ({
  data
}) => {
  const cart = useCart();
  const router = useRouter();
  const previewModal = usePreviewModal();
  const handleClick = () => {
    router.push(`/product/${data?.id}`)
  }

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    previewModal.onOpen(data);
    
  }

  const onAddToCart:MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    cart.addItem(data);
  }
  return (
    <div onClick={handleClick} className='bg-white group cursor-pointer rounded-xl border p-3 space-y-y'>
      <div className='aspect-square rounded-xl bg-gray-100 relative'>
        <Image
        src={data?.images?.[0]?.url}
        fill
        alt='Image'
        className='aspect-square object-cover rounded-md'
        />
        <div className='opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition absolute w-full px-6 bottom-5'>
          <div className='flex gap-x-6 justify-center'>
            <IconButton
            onClick={(e) => {
              onPreview(e);
            }}
            icon={<Expand size={20} className='text-gray-600' />}
            />
            <IconButton
            onClick={onAddToCart}
            icon={<ShoppingCart size={20} className='text-gray-600' />}
            />
          </div>
        </div>
      </div>
      {/* Description */}
      <div>
        <p className='font-semibold text-lg dark:text-black'>
          {data.name}
        </p>
        <p className='text-sm text-gray-500'>
          {data.category?.name}
        </p>
      </div>
      <div className='flex items-center justify-between'>
        <Currency value={data?.price} />
      </div>
    </div>
  )
}

export default ProductCard