'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {z} from 'zod'

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
    const form = useForm <z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues: {
            username:'',
            email:'',
            password: '',
            confirmPassword: ''
        }
    })

    console.log(typeof form)
    function onSubmit(values:z.infer<typeof formSchema>){

        setLoading(true)

        console.log(values);

        setTimeout(()=>{
            setLoading(false)
        },2000)
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
                        user ? 'Link account':
                            type === 'Sign in' ? 'Sign in' : 'Sign up'
                    }
                </h1>
                <p className='text-sm lg:text-base text-gray-500'>
                    {
                        user ? 'Link your account to continue':
                            type === 'Sign in' ? 'Sign in to your account' : 'Sign up for an account'
                    }
                </p>
            </div>
           {
            user? <div>

            </div>:
            <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                    
                    <FormInput control={form.control} name='username'/>
                    <FormInput control={form.control} name='email' type='email'/>
                    
                    <FormInput control={form.control} name='password' type='password'/>
                  
                    <FormInput control={form.control} name='confirmPassword'  type='password'/>
                
                    <Button type='submit' className='w-full'>
                        {
                            type === 'Sign in' ? 'Sign in' : 'Sign up'
                        }
                      {
                        loading && (
                            <Loader2 size={24} className='animate-spin'/>
                        )
                      }
                    </Button>
                </form>
            </Form>
            </>
           }
        </section>
    )
}

export default AuthForm