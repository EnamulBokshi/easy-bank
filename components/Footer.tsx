'use client'
import { logoutUser } from '@/lib/actions/user.actions'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


const Footer = ({ user, device = 'desktop' }: FooterProps) => {
    const router = useRouter()

    const handleLogout = async () => {
        const response = await logoutUser();
        if (!response) {
            router.push('/sign-in')
        }
    }

    return (
        <footer className='footer border-t border-gray-200 space-x-3'>
            <div className={device === 'desktop' ? 'footer_name' : 'footer_name-mobile'}>
                <p className='text-xl font-extrabold text-gray-700'>
                    {user?.name[0].toUpperCase()}
                </p>
            </div>
            <div className={device === 'desktop' ? 'footer_email' : 'footer_email-mobile'}>
                <h1 className='truncate font-extrabold text-gray-800'>
                    {user?.name}
                </h1>
                <p className='text-gray-600'>{user?.email}</p>
            </div>
            <div className='footer_image'  >
                <AlertDialog>
                    <AlertDialogTrigger>                <Image src={'icons/logout.svg'} fill alt='logout' className='hover:opacity-80 scale-105 duration-100' />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                You will logout from your account.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleLogout}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </div>
        </footer>
    )
}

export default Footer