import { Clapperboard, Home, Library, Repeat } from 'lucide-react'
import React from 'react'

function Sidebar() {
  return (
      <aside className='sticky top-0 overflow-y-auto scrollbar-hidden 
                pb-4 flex flex-col gap-6 ml-1 lg:hidden'>
        <SmallSideBarItem Icon={Home} title='Home' url='/' />
        <SmallSideBarItem Icon={Repeat} title='Shorts' url='/shorts' />
        <SmallSideBarItem Icon={Clapperboard} title='Subscriptions' url='/subscriptions' />
        <SmallSideBarItem Icon={Library} title='Library' url='/library' />  
    </aside>
  )
}

function SmallSideBarItem({ Icon, title, url }) {
    return (
        <a href={url} className='flex flex-col justify-center items-center gap-1'>
            <Icon className='w-5 h-5' />
            <div className='text-xs text-center'>{title}</div>
        </a>
    )
}

export default Sidebar