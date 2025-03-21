import MobileNav from '@/components/MobileNav'
import Sidebar from '@/components/Sidebar'
import { getLoggedUser } from '@/lib/actions/user.actions'
import Image from 'next/image'
import React from 'react'

const RootLayout = async({ children, }:Readonly< {children: React.ReactNode}>) => {
  const user = await getLoggedUser();
  return (
    <main className='flex h-screen w-full '>
        <Sidebar user={user}/>

        <div className='size-full  p-2'>
          <div className=' mobile-nav-container shadow '>
          <Image src={'/icons/logo.svg'} width={30} height={30} alt='logo'/>
          <div className='mobile-nav'>
            <MobileNav user={user}/>
          </div>

          </div>
          {children}
        </div>

       
    </main>
    )
}

    export default RootLayout