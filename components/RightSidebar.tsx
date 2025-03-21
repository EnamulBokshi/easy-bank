import React from 'react'
import BankCard from './BankCard'

const RightSidebar = ({ user, transactions, banks }: RightSidebarProps) => {
    return (
        <aside className='right-sidebar '>
            <section className='flex flex-col pb-8 '>
                <div className='profile-banner bg-gradient-mesh'>
                    <div className='profile'>
                        <div className='profile-img flex items-center justify-center'>
                            <span className='text-5xl  font-bold text-blue-500 '>
                                {user?.name[0]}
                            </span>
                        </div>
                        <div className='profile-details mt-25'>
                            <h1 className='text-2xl font-bold'>
                                {user?.name} {user?.lastName}
                            </h1>
                            <p className='text-gray-500'>
                                {
                                    user?.email
                                }
                            </p>
                        </div>

                    </div>

                </div>
            </section>

            <section className='banks mt-30 py-8 border-b'>
                <div className='flex w-full justify-between items-center'>
                    <h2 className='text-xl font-bold'>Banks</h2>
                    <span className='text-blue-500 cursor-pointer hover:text-blue-400'>+ Add bank</span>
                </div>

                {
                    banks?.length > 0 && (
                        <div className='relative flex flex-1 flex-col items-center justify-center gap-5'>
                            <div className='relative z-10 '>
                                <BankCard 
                                    key={banks[0].$id}
                                    account = {banks[0]}
                                    userName = {`${user?.name}`}
                                    showBalance = {false}

                                />
                            </div>
                            {
                                banks[1] && (
                                    console.log(banks[1]),
                                    <div className='absolute top-8 right-0 z-0 w-[90%]'>
                                       <BankCard 
                                            key={banks[1].$id}
                                            account = {banks[1]}
                                            userName = {`${user?.name}`}
                                            showBalance = {false}
                                        />


                                    </div>
                                )
                            }
                        </div>

                    )
                }
            </section>
            <section className=''>
                <div className='flex flex-col mt-5'>
                    <div className='bank flex justify-between items-center'>
                        <div className='bank-details'>
                            <h3 className='text-lg font-bold'>Bank of America</h3>
                            <p className='text-gray-500'>Checking</p>
                        </div>
                        <div className='bank-balance'>
                            <p className='text-lg font-bold'>$2999.33</p>
                        </div>
                    </div>
                </div>
            </section>
        </aside>
    )
}

export default RightSidebar