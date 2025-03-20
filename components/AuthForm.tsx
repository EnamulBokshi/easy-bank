'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { formSchema } from '@/zodSchema/Schema'
import FormInput from './FormInput'
import { Loader2 } from 'lucide-react'



const AuthForm = ({ type }: { type: string }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const authFormSchema = formSchema(type)
    const form = useForm<z.infer<typeof authFormSchema>>({
        resolver: zodResolver(authFormSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            address: '',
            state: '',
            postalCode: '',
            dob: '',
            ssn: ''

        }
    })

    console.log(typeof form)
    function onSubmit(values: z.infer<typeof authFormSchema>) {

        setLoading(true)

        console.log(values);

        setTimeout(() => {
            setLoading(false)
        }, 2000)
        // setLoading(false)

    }
    return (
        <section className='auth-form'>
            <Link href={'/'}
                className='cursor-pointer items-center  gap-2 flex '
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

            <div className='flex flex-col gap-1 md:gap-3'>
                <h1 className='text-2xl lg:text-3xl text-gray-900 font-semibold'>
                    {
                        user ? 'Link account' :
                            type === 'Sign in' ? 'Sign in' : 'Sign up'
                    }
                </h1>
                <p className='text-sm lg:text-base text-gray-500'>
                    {
                        user ? 'Link your account to continue' :
                            type === 'Sign in' ? 'Sign in to your account' : 'Sign up for an account'
                    }
                </p>
            </div>
            {
                user ? <div>

                </div> :
                    <>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>

                                {
                                    type === 'Sign up' && (

                                        <>
                                            <FormInput control={form.control} name='username' placeholder='Username' />
                                            <div className='flex justify-between gap-4'>
                                                <FormInput control={form.control} name='firstName' label='First Name' placeholder='Enter your first name' />
                                                <FormInput control={form.control} name='lastName' label='Last Name' placeholder='Enter your last name' />

                                            </div>
                                            <FormInput control={form.control} name='address' label='Address' placeholder='Address' />
                                            <div className='flex justify-between gap-4'>

                                                <FormInput control={form.control} name='state' label='State' placeholder='ex: Dhaka' />
                                                <FormInput control={form.control} name='postalCode' label='Postal Code' placeholder='es: 7900' />

                                            </div>
                                            <div className='flex justify-between  '>
                                                <FormInput control={form.control} name='dob' label='Date of Birth' type='date' placeholder='dd-mm-yyyy' />
                                                <FormInput control={form.control} name='ssn' label='SSN' placeholder='ex: 1234' />

                                            </div>
                                            <FormInput control={form.control} name='email' type='email' placeholder='someone@example.com' />
                                            <FormInput control={form.control} name='password' type='password' placeholder='Password' />
                                            <FormInput control={form.control} name='confirmPassword' type='password' placeholder='Confirm Password' />

                                        </>
                                    )
                                }

                                {
                                    type === 'Sign in' && (
                                        <>
                                            <FormInput control={form.control} name='email' type='email' />
                                            <FormInput control={form.control} name='password' type='password' />
                                        </>
                                    )
                                }



                                <Button type='submit' className='w-full' disabled={loading}>

                                    {
                                        loading ? (
                                            <>
                                                <span className='mr-2'>Submitting...</span>
                                                <Loader2 size={24} className='animate-spin' />

                                            </>
                                        ) : type === 'Sign in' ? 'Sign in' : 'Sign up'
                                    }
                                </Button>
                            </form>
                        </Form>
                        <footer className='flex  gap-2'>
                            <p >
                                {
                                    type === 'Sign in' ? 'Don\'t have an account?' : 'Already have an account?'
                                }
                            </p>
                            <Link href={type === 'Sign in' ? '/sign-up' : '/sign-in'} className='text-blue-500 underline'>
                                {
                                    type === 'Sign in' ? 'Sign up' : 'Sign in'
                                }
                            </Link>

                        </footer>
                    </>
            }
        </section>
    )
}

export default AuthForm