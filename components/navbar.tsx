import React from 'react'
import Container from './ui/container'
import Link from 'next/link'
import MainNav from './main.nav'
import getCategories from '@/actions/get-categories'
import NavBarActions from './navbar-actions'
import Image from 'next/image'

export const revalidate = 0;

const Navbar = async () => {
  const categories = await getCategories();
  return (
    <div className='border-b'>
        <Container>
          <div className="relative px-4 sm:px-6 lg:px-6 flex h-16 items-center">
            <Link href="/" className='ml-4 flex lg:ml-0 gap-x-2'>
              <Image
              src="/logo.png"
              width={50}
              height={50}
              alt=''
              className='object-cover object-center rounded-full'
              />
            </Link>
            <MainNav data={categories} />
            <NavBarActions />
          </div>
        </Container>
    </div>
  )
}

export default Navbar