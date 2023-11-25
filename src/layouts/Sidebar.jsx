import { ChevronDown, ChevronUp, Clapperboard, Clock, Film, Flame, Gamepad, History, Home, Library, Lightbulb, ListVideo, Music2, Newspaper, PlaySquare, Podcast, Radio, Repeat, Shirt, ShoppingBag, Trophy } from 'lucide-react'
import React, { Children, useState } from 'react'
import { playlists, subscriptions } from '../data/data'
import { useSidebarContext } from '../contexts/SidebarContext'
import { PageHeaderLogoSection } from './PageHeader'
function Sidebar() {
    const {isLargeOpen, isSmallOpen, close } = useSidebarContext()
    return (
        <>
        {/* small sidebar section  */}
        <aside className={`sticky top-0 overflow-y-auto scrollbar-hidden
                    pb-4 flex flex-col gap-6 ml-1 ${isLargeOpen ? "lg:hidden" : "lg:flex"} `}
            >
                <SmallSideBarItem Icon={Home} title='Home' url='/' />
                <SmallSideBarItem Icon={Repeat} title='Shorts' url='/shorts' />
                <SmallSideBarItem Icon={Clapperboard} title='Subscriptions' url='/subscriptions' />
                <SmallSideBarItem Icon={Library} title='Library' url='/library' />  
            </aside>
       
        {isSmallOpen && (
        <div
          onClick={close}
          className="lg:hidden fixed inset-0 z-[999] bg-secondary-darK opacity-50"
        />
      )}
        {/* large sidebar section  */}
        
        <aside className={`w-56 lg:sticky absolute  top-0 overflow-y-auto scrollbar-hidden
            pb-4 flex-col gap-2 px-2 ${
          isLargeOpen ? "lg:flex" : "lg:hidden"
        } ${isSmallOpen ? "flex z-[999] bg-white max-h-screen" : "hidden"}`}>
            <div className='lg:hidden pt-2 pb-4 px-2 sticky top-0 bg-white'>   
                <PageHeaderLogoSection />
            </div>
            <LargeSidebarSection>
                <LargeSidebarItem Icon={Home} isActive title='Home' url='/' /> 
                <LargeSidebarItem Icon={Repeat} title='Shorts' url='/shorts' />
                <LargeSidebarItem Icon={Clapperboard} title='Subscriptions' url='/subscriptions' />       
            </LargeSidebarSection>
            <hr />
            <LargeSidebarSection title='You' visibleItemCount={5}>
                <LargeSidebarItem Icon={Library} title='Library' url='/library' />
                <LargeSidebarItem Icon={History} title='History' url='/History' />
                <LargeSidebarItem Icon={PlaySquare} title='Videos' url='/videos' />
                <LargeSidebarItem Icon={Clock} title='Watch Later' url='/watch-later' />
                {
                    playlists.map(playlist => (
                        <LargeSidebarItem
                            key={playlist.id}
                            Icon={ListVideo}
                            title={playlist.name}
                            url={`/playlists?list=${playlist.id}`}
                        />
                    ))
                }
            </LargeSidebarSection>
            <hr />
            <LargeSidebarSection title='Subscription'>
                {
                    subscriptions.map(subscription => (
                        <LargeSidebarItem
                            key={subscription.id}
                            Icon={subscription.imgUrl}
                            title={subscription.channelName}
                            url={`/@${subscription.id}`}
                        />
                    ))
                }
            </LargeSidebarSection>
            <hr />
            <LargeSidebarSection title="Explore">
                <LargeSidebarItem Icon={Flame} title="Trending" url="/trending" />
                <LargeSidebarItem Icon={ShoppingBag} title="Shopping" url="/shopping" />
                <LargeSidebarItem Icon={Music2} title="Music" url="/music" />
                <LargeSidebarItem Icon={Film} title="Movies & TV" url="/movies-tv" />
                <LargeSidebarItem Icon={Radio} title="Live" url="/live" />
                <LargeSidebarItem Icon={Gamepad} title="Gaming" url="/gaming"/>
                <LargeSidebarItem Icon={Newspaper} title="News" url="/news" />
                <LargeSidebarItem Icon={Trophy} title="Sports" url="/sports"/>
                <LargeSidebarItem Icon={Lightbulb} title="Learning" url="/learning"/>
                <LargeSidebarItem Icon={Shirt} title="Fashion & Beauty" url="/fashion-beauty"/>
                <LargeSidebarItem Icon={Podcast} title="Podcasts" url="/podcasts"/>
        </LargeSidebarSection>
                

        </aside>
    </>
  )
}

function SmallSideBarItem({ Icon, title, url}) {
    return (
        <a href={url} className='flex flex-col justify-center items-center gap-1'>
                <Icon className='w-5 h-5' />
            <div className='text-xs text-center'>{title}</div>
        </a>
    )
}

function LargeSidebarSection({children, title, visibleItemCount=Number.POSITIVE_INFINITY}) {
    const [isExpanded, setIsExpanded] = useState(false)
    const childrenArray = Children.toArray(children).flat()
    const showExpandButton = childrenArray.length > visibleItemCount
    const visibleChildren = isExpanded ? childrenArray : childrenArray.slice(0, visibleItemCount)
    const ButtonIcon = isExpanded ? ChevronUp : ChevronDown
    return (
        <div>
            {title && <div className='ml-4 mt-2 text0lg mb-1'>{ title }</div>}
            {visibleChildren}
            {showExpandButton && 
                <button
                    onClick={()=>setIsExpanded(e => !e)}
                    className='w-full flex items-center rounded-lg gap-4 p-3'>
                    <ButtonIcon className='w-5 h-5' />
                    <div>{ isExpanded ? 'Show Less' : 'Show More'}</div>
                </button>
            }
        </div>
    )
}

function LargeSidebarItem({Icon, title, url, isActive=false}) {
    return (
        <a href={url}
            className={`w-full flex items-center rounded-lg gap-4 p-3
            ${isActive ? 'font-blod bg-neutral-100 hover:bg-secondary' : undefined }`}
        >
            {typeof Icon === "string" ? (
                <img src={Icon} className="w-6 h-6 rounded-full" />
                ) : (
                    <Icon className="w-6 h-6" />
                )}
            <div className='whitespace-nowrap overflow-hidden text-ellipsis'>
                {title}
            </div>
        </a>
    )
}

export default Sidebar