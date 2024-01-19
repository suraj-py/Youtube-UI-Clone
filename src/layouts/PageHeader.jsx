import React, { useState } from 'react'
import { Menu, Upload, Bell, User, Mic, Search, ArrowLeft } from 'lucide-react'
import logo from '../assets/logo.png'
import { useSidebarContext } from '../contexts/SidebarContext'

function PageHeader() {

    const [showFullSearchBar, setShowFullSearchBar] = useState(false)
    
  return (
      <div className='flex gap-10 lg:gap20 justify-between px-4 mb-1'>
          {/* logo section  */}
          <PageHeaderLogoSection hidden={showFullSearchBar}/>

          {/* search bar section  */}
          <form className={`md:flex gap-4 flex-grow justify-center items-center 
          ${showFullSearchBar ? 'flex' : 'hidden'}`}>
              {showFullSearchBar && (
                  <button
                      type='button'
                      onClick={() => setShowFullSearchBar(false)}
                      className='flex-shrik-0'>
                  
                      <ArrowLeft />
              </button>)}
              <div className='flex flex-grow max-w-[600px]'>
                  <input type='search' placeholder='Search'
                      className='rounded-l-full border border-secondary-border shadow-inner
                     shadow-secondary px-4 py-1 text-lg w-full h-10 outline-none focus:border-blue-500'
                  />
                  <button type='button'
                      className='py-1 px-4 rounded-r-full border-secondary-border 
                            border border-l-0 flex-shrink-0 '>
                      <Search />
                  </button>
              </div>
              <button className='flex-shrik-0'>
                  <Mic />
              </button>
          </form>
          
          {/* other buttons  */}
          <div className={`flex-shrink-0  gap-6 ${showFullSearchBar ? 'hidden' : 'flex'}`}>
              <button onClick={() => setShowFullSearchBar(true)}
                  className='md:hidden'>
                  <Search />
              </button>
              <button className='md:hidden'>
                  <Mic />
              </button>
              <button className=''>
                  <Upload />
              </button>
              <button>
                  <Bell />
              </button>
              <button>
                  <User />
              </button>
          </div>
          
    </div>
  )
}

export function PageHeaderLogoSection({ hidden=false }) {
     const { toggle } = useSidebarContext()
    return (
        <>
        {/* logo section  */}
          <div className={`gap-4 items-center flex-shrink-0 ${hidden ? 'hidden' : 'flex'}`}>
              <button onClick={toggle}>
                  <Menu />
              </button>
              <a href="/">
                  <img src={logo}
                      className='h-24'
                      alt="logo image" />
              </a>
            </div>
        </>
    )
}

export default PageHeader