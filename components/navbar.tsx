'use client';
import React, { useEffect, useState } from 'react'
import Container from './ui/container'
import MainNav from './main.nav'
import getCategories from '@/actions/get-categories'
import NavBarActions from './navbar-actions'
import Image from 'next/image'
import SelectStore  from './stores'
import getStores from '@/actions/get-stores'
import useCart from '@/hooks/use-cart';
import { Category, Store } from '@/types';

export const revalidate = 0;

const Navbar =  () => {
  const cart = useCart();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  useEffect(()=>{
    const getData = async () => {
      const categories = await getCategories(cart.storeId);
      const stores: (Store[] | any) = await getStores();
      setStores(stores);
      setCategories(categories);
      
    }
    setIsMounted(true);
    getData();
  }, [cart.storeId]);
  
  if(!isMounted) {
    return null;
}
  return (
    <div className='border-b'>
        <Container>
          <div className="relative px-4 sm:px-6 lg:px-6 flex h-16 items-center overflow-hidden">
            <SelectStore data={stores}/>
            <MainNav data={categories} />
            <NavBarActions />
          </div>
        </Container>
    </div>
  )
}

export default Navbar