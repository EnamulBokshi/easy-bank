'use client'
import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { FaBars } from 'react-icons/fa6'
import Link from 'next/link'
import Image from 'next/image'
import { sidebarLinks } from './Sidebar'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Footer from './Footer'

const MobileNav = ({ user }: MobileNavProps) => {
    const pathname = usePathname()
    return (
        <section className='w-full relative'>
            <Sheet >
                <SheetTrigger>
                    <FaBars className='text-2xl' />
                </SheetTrigger>
                <SheetContent side='left'>
                    <div className='flex flex-col justify-between items-center h-full'>
                    <nav className='flex flex-col gap-4 p-5'>
                        <Link href={'/'}
                            className='mb-12 cursor-pointer items-center ps-10 gap-2 flex '
                        >
                            <Image
                                src="/icons/logo.svg"
                                alt="Banking platform logo"
                                width={24}
                                height={24}
                                className='size-'
                            />
                            <span className='text-xl font-extrabold text-gray-500   '>EasyBanking</span>
                        </Link>

                        {
                            sidebarLinks.map((item, index) => {
                                const isActive = item.route === pathname || pathname.startsWith(`${item.route}/`)

                                return (
                                    <SheetClose asChild key={index}>

                                        <Link key={index} href={item.route} className={cn('rounded-lg px-6  py-3 hover:bg-gray-200 text-gray-500', { 'active': isActive })}>
                                            <div className=' flex items-center justify-start gap-2 md:gap-4  rounded-lg'>
                                                <span className="inline ">
                                                    {item.icon}
                                                </span>
                                                <p className={cn('ms-4 lg:inline', {
                                                    '!text-white': isActive
                                                })} >
                                                    {item.label}
                                                </p>
                                            </div>
                                        </Link>
                                    </SheetClose>
                                )
                            })
                        }
                        
                    </nav>
                    <Footer user={user} device='mobile'/>
                    </div>

                </SheetContent>
                
            </Sheet>
            
        </section>
    )
}

export default MobileNav