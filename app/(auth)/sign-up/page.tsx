import AuthForm from '@/components/AuthForm'
import { getLoggedUser } from '@/lib/actions/user.actions'
import React from 'react'

const SignUp = async() => {
  const loggedUser = await getLoggedUser()

  if (loggedUser) {
    console.log(loggedUser)
  }
  return (
    <section className='flex-center size-full max-sm:px-6'>
      <AuthForm type = "Sign up"/>
    </section>
  )
}

export default SignUp