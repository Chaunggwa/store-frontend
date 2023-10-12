"use client";
import getProduct from '@/actions/get-product'
import getProducts from '@/actions/get-products'
import Gallery from '@/components/gallery'
import Info from '@/components/info'
import ProductList from '@/components/products-list'
import Container from '@/components/ui/container'
import useCart from '@/hooks/use-cart'
import { Product } from '@/types';
import React, { useEffect, useState } from 'react'

interface ProductPageProps {
  params: {
    productId: string
  }
}
const ProductPage: React.FC<ProductPageProps> = ({
  params
}) => {
  const cart = useCart();
  const [mounted, setMounted] = useState(false);
  const [product, setProduct] = useState<Product | any>();
  const [suggestedProducts, setSuggestedProducts] = useState<Product[] | any>([]);

  useEffect(() => {
    const getData = async () => {
      const product = await getProduct(cart.storeId, params.productId);
      const suggestedProducts = await getProducts(cart.storeId, {
        categoryId: product?.category?.id
      })
      console.log(product);
      setProduct(product);
      setSuggestedProducts(suggestedProducts);
      setMounted(true);
    }
    getData();
    
  }, [cart.storeId]);

  if(!mounted) {
    return null;
  }
  
  return (
    <div className='bg-white'>
      <Container>
        <div className='px-4 py-10 sm:px-6 lg:px-8'>
          <div className='lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8'>
              {/* Gallery  */}
              <div>
                <Gallery images={product.images}/>
              </div>
              <div className='mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0'>
                <Info data={product} />
              </div>
          </div>
          <hr className='my-10' />
          <ProductList title="Suggested products" items={suggestedProducts}/>
        </div>
      </Container>
    </div>
  )
}

export default ProductPage