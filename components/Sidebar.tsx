'use client'
// import { sidebarLinks } from '@/constants'
import { FaHome } from "react-icons/fa";

import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { BiDollarCircle } from "react-icons/bi";

import { MdChangeHistory } from "react-icons/md";
import { SiMoneygram } from "react-icons/si";
import Footer from "./Footer";

export const sidebarLinks = [
    {
      icon: <FaHome />,
      route: "/",
      label: "Home",
    },
    {
      icon: <BiDollarCircle />,
      route: "/my-banks",
      label: "My Banks",
    },
    {
      icon: <MdChangeHistory />,
      route: "/transaction-history",
      label: "Transaction History",
    },
    {
      icon: <SiMoneygram />,
      route: "/payment-transfer",
      label: "Transfer Funds",
    },
  ];

const Sidebar = ({ user }: SiderbarProps) => {
    const pathname = usePathname()
    return (
        <section className='sidebar'>
            <nav className='flex flex-col gap-4'>
                <Link href={'/'}
                    className='mb-12 cursor-pointer items-center gap-2'
                >
                    <Image
                        src="/icons/logo.svg"
                        alt="Banking platform logo"
                        width={34}
                        height={34}
                        className='size-[24px] max-xl:size-14'
                    />
                    <span className='text-xl font-extrabold text-gray-500 hidden lg:block'>EasyBanking</span>
                </Link>

                {
                    sidebarLinks.map((item, index) => {
                        const isActive = item.route === pathname || pathname.startsWith(`${item.route}/`)

                        return (
                            <Link key={index} href={item.route} className={cn('rounded-lg p-4 hover:bg-gray-200 text-gray-500', { 'active': isActive })}>
                                <div className=' flex items-center  sm:justify-start gap-2 md:gap-4  rounded-lg'>
                                   <span className="inline ">
                                        {item.icon}
                                   </span>
                                    <p className ={cn('hidden lg:inline' ,{
                                        '!text-white':isActive
                                    })} >
                                        {item.label}
                                    </p>
                                </div>
                            </Link>
                        )
                    })
                }

            </nav>

            <Footer user={user}/>
        </section>
    )
}

export default Sidebar