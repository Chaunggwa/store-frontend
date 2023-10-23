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
  const [billboards, setBillboard] = useState<BillboardType[] | undefined | any>();
  useEffect(() => {
    const getData = async () => {
      const products = await getProducts(cart.storeId,{isFearuted: true});
      const billboards = await getBillboards(cart.storeId);
      setBillboard(billboards);
      setProducts(products);
    }
    getData();
  }, [cart.storeId]);
  return (
    <Container>
    <div className='space-y-10 pb-10'>
      <Billboard data={billboards ? billboards[0] : undefined}/>
    
    <div className='flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8'>
      {(products.length < 1) ? <span className="loading loading-ring loading-lg"></span> : <ProductList title="Featured Products" items={products} />}
    </div>
    </div>
    </Container>
  )
}

export default Home