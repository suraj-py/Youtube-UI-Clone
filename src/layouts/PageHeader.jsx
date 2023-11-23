import React, { useState } from 'react'
import { Menu, Upload, Bell, User, Mic, Search, ArrowLeft } from 'lucide-react'
import logo from '../assets/logo.png'

function PageHeader() {

    const [showFullSearchBar, setShowFullSearchBar] = useState(false)

  return (
      <div className='flex gap-10 lg:gap20 justify-between pt-1 px-4 mb-6 bg-red-200'>
          {/* logo section  */}
          <div className={`gap-4 items-center flex-shrink-0 ${showFullSearchBar ? 'hidden' : 'flex'}`}>
              <button>
                  <Menu />
              </button>
              <a href="/">
                  <img src={logo}
                      className='h-14'
                      alt="logo image" />
              </a>
          </div>

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
              <button>
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

export default PageHeader