import HeaderContainer from '@/components/HeaderContainer'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import { getLoggedUser } from '@/lib/actions/user.actions'
import { Loader2 } from 'lucide-react'
import React from 'react'

const Home = async () => {
  const loggedUser = await getLoggedUser() || {
    $id: '',
    email: '',
    userId: '',
    dwollaCustomerUrl: '',
    dwollaCustomerId: '',
    firstName: '',
    lastName: '',
    name:'',
    address1: '',
    city: '',
    state: '',
    postalCode: '',
    dateOfBirth: '',
    ssn: ''
  };

  if(!loggedUser){
    return <Loader2 className='animate-spin'/>
  }

  return (
    <section className='no-scroll home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderContainer
            type="greeting"
            title="Welcome"
            user={loggedUser?.name || 'Guest'}
            subtext="to the best banking platform. Manage yur account and transactions with ease."
          />
        
        <TotalBalanceBox accounts = {[]} totalBanks = {1} totalCurrentBalance = {2999.33}/>
        
        </header>
          <div className='p-2'>
            <h2>Transaction history todo</h2>
            <div className='home-cta'>
              <button className='btn btn-primary'>Create Account</button>
            </div>
          </div>
      </div>

    <div >
      <RightSidebar 
        user = {loggedUser}
        transactions = {[]}
        banks = {[{currentBalance:158.30},{currentBalance: 120.30}]}
      />

    </div>

    </section>
  )
}

export default Home