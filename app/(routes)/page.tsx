'use client';
import getBillboards from '@/actions/get-billboards'
import getProducts from '@/actions/get-products';
import Billboard from '@/components/billboard'
import ProductList from '@/components/products-list';
import Container from '@/components/ui/container';
import useCart from '@/hooks/use-cart';
import { Billboard as BillboardType, Product } from '@/types';
import React, { useEffect, useState } from 'react'

export const revalidate = 0;
const Home =  () => {
  const cart = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [billboard, setBillboard] = useState<BillboardType>();
  useEffect(() => {
    const getData = async () => {
      const products = await getProducts(cart.storeId,{isFearuted: true});
      const billboard = await getBillboards(cart.storeId,"64f928d15d3d07f07d3448ba");
      setBillboard(billboard);
      setProducts(products);
    }
    getData();
  }, [cart.storeId]);
  return (
    <Container>
    <div className='space-y-10 pb-10'>
      <Billboard data={billboard ? billboard[0] : undefined}/>
    
    <div className='flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8'>
      <ProductList title="Featured Products" items={products} />
    </div>
    </div>
    </Container>
  )
}

export default Home