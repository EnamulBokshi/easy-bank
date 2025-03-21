'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
    Form,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { formSchema,signInFormSchema} from '@/zodSchema/Schema'
import FormInput from './FormInput'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signIn, signUp } from '@/lib/actions/user.actions'




const AuthForm = ({ type }: { type: string }) => {
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const authFormSchema = formSchema(type==='Sign up')
    const signInSchema = signInFormSchema
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
            ssn: '',
            city: ''

        }
    })

    const signInForm = useForm<z.infer<typeof signInFormSchema>>({
        resolver: zodResolver(signInFormSchema),
        defaultValues: {
            email: '',
            password: ''
        }

    })
    const {errors} = form.formState;
    // console.log(errors)

    const onSignUp = async (data: z.infer<typeof signInSchema> | z.infer<typeof signInFormSchema>) => {

        setLoading(true)

        try {
       
                const newUser = await signUp(data);
                setUser(newUser)
                if (newUser) {
                    router.push('/')
                }
        

        } catch (error) {
            console.log(error)

        }
        finally {
            setLoading(false)
        }

    }
    const onSignIn = async (data: z.infer<typeof signInFormSchema>) => {
        setLoading(true)
        console.log("onSubmit called")
        try {
            if (type === 'Sign in') {
                console.log('clicked')
                const response = await signIn({
                    email: data.email,
                    password: data.password
                })
                console.log(response)
                if (response) {
                    router.push('/')
                }
            }
            console.log("all passed")

        } catch (error) {
            console.log(error)

        }
        finally {
            setLoading(false)
        }

    }
    return (
        <section className='auth-form '>
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
                            <form onSubmit={type === 'Sign up'? form.handleSubmit(onSignUp): form.handleSubmit(onSignIn)} className='space-y-8'>

                                {
                                    type === 'Sign up' && (

                                        <>
                                            <FormInput control={form.control} name='username' placeholder='Username' />
                                            <div className='flex justify-between gap-4'>
                                                <FormInput control={form.control} name='firstName' label='First Name' placeholder='Enter your first name' />
                                                <FormInput control={form.control} name='lastName' label='Last Name' placeholder='Enter your last name' />

                                            </div>
                                            <FormInput control={form.control} name='address' label='Address' placeholder='Address' />
                                            <FormInput control={form.control} name='city' label='City' placeholder='ex: Dhaka' />
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
                                            <FormInput control={form.control} name='email' type='email' placeholder='Enter your email'/>
                                            <FormInput control={form.control} name='password' type='password' placeholder='Enter your password' />

                                            
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