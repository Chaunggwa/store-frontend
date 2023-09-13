import getBillboards from '@/actions/get-billboards'
import getProducts from '@/actions/get-products';
import Billboard from '@/components/billboard'
import ProductList from '@/components/products-list';
import Container from '@/components/ui/container';
import React from 'react'

export const revalidate = 0;
const Home = async () => {
  const products = await getProducts({isFearuted: true});
  const billboard = await getBillboards("64f928d15d3d07f07d3448ba");
  
  return (
    <Container>
    <div className='space-y-10 pb-10'>
      <Billboard data={billboard}/>
    
    <div className='flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8'>
      <ProductList title="Featured Products" items={products} />
    </div>
    </div>
    </Container>
  )
}

export default Home