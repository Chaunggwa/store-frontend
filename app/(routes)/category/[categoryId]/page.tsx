"use client";
import getCategory from '@/actions/get-category';
import getColors from '@/actions/get-colors';
import getProducts from '@/actions/get-products';
import getSizes from '@/actions/get-sizes';
import Billboard from '@/components/billboard';
import Container from '@/components/ui/container';
import React, { useEffect, useState } from 'react'
import Filter from './components/filter';
import NoResults from '@/components/ui/NoResults';
import ProductCard from '@/components/ui/product-card';
import MobileFilters from './components/mobile-filters';
import useCart from '@/hooks/use-cart';
import { Category, Color, Product, Size } from '@/types';

export const revalidate = 0;
interface CategoryPageProps {
    params: {
        categoryId: string
    },
    searchParams: {
        colorId: string;
        sizeId: string
    }
}

const Category: React.FC<CategoryPageProps> =  ({
    params, searchParams
}) => {
    const[mounted, setIsMounted] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [sizes, setSizes] = useState<Size[]>([]);
    const [colors, setColors] = useState<Color[]>([]);
    const [category, setCategory] = useState<Category>();
    const cart = useCart();

    useEffect(() => {
        const getData = async() => {
            const sizes = await getSizes(cart.storeId);
           
            const colors = await getColors(cart.storeId);
            const category = await getCategory(cart.storeId, params.categoryId);
            const products = await getProducts(cart.storeId, {
                categoryId: params.categoryId,
                colorId: searchParams.colorId,
                sizeId: searchParams.sizeId
            });
            setSizes(sizes);
            setColors(colors);
            setCategory(category);
            setProducts(products);
        }
        getData();
        setIsMounted(true);
    }, [cart.storeId]);
    
  if(!mounted) {
    return null;
  }
  return (
    <div className='bg-white'>
        <Container>
            <Billboard data={category ? category.billboard : undefined}/>
        </Container>
        
        <div className='px-4 sm:px-6 lg:px-8 pb-24'>
        <MobileFilters sizes={sizes} colors={colors} />
            <div className='hidden lg:grid lg:grid-cols-5 lg:gap-x-8'>
                <Filter name="Sizes" data={sizes} valueKey="sizeId"/>
                <Filter name="Colors" data={colors} valueKey="colorId"/>

            </div>
            <div className='mt-6 lg:col-span-4 lg:mt-0'>
                {products.length === 0 && <NoResults />}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                    {products.map((item) => (
                        <ProductCard
                        key={item.id}
                        data={item}
                        />
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Category