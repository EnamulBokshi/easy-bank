import Image from 'next/image'
import React from 'react'

function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex min-h-screen w-full ">

      <div className="w-1/2 min-h-screen flex items-center justify-center">
        {children}
      </div>

      <div className="w-1/2 min-h-screen  hidden sm:flex items-center justify-end relative bg-gray-200">
        <Image
          draggable={false}
          src={'https://cdn.pixabay.com/photo/2017/06/24/22/33/credit-card-2439141_960_720.jpg'}
          alt="Auth image"
          width={700}
          height={700}
          className="border-1 border-gray-300 rounded-lg"
          objectFit="cover" 
          
        />
      </div>
    </main>
  )
}

export default RootLayout
