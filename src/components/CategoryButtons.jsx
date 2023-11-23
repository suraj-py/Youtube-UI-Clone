import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

const TRANSLATE_VALUE = 200
export default function CategoryButtons({categories, selectedCategory, onSelect}) {
    const [isLeftVisible, setIsLeftVisible] = useState(false)
    const [isRightVisible, setIsRightVisible] = useState(false)
    const [translate, setTranslate] = useState(0)
    const containerRef = useRef(null)

    useEffect(() => {
        if (containerRef.current == null) return 
        const observer = new ResizeObserver(entries => {
            const container = containerRef.current
            if (container == null) return
            setIsLeftVisible(translate > 0)
            setIsRightVisible(
                translate + container.clientWidth < container.scrollWidth
            )
        })

        observer.observe(containerRef.current)
        return () => {
            observer.disconnect()
        }
    }, [categories, translate])
    
    return (
        <div ref={containerRef} className='relative overflow-hidden'>
            <div
                className='flex whitespace-nowrap gap-3 transition-transform w-[max-content]'
                style={{transform: `translateX(-${translate}px)`}}
            >
                {
                    categories.map(category => (
                        <button
                            onClick={()=> onSelect(category)}
                            className={`border rounded-lg px-2 py-1 text-base 
                                    ${selectedCategory === category ?
                                    'bg-secondary-darK text-white' : 'bg-secondary'} `}
                            key={category}
                        >
                            {category}
                        </button>
                    ))
                }
            </div>
            
            {isLeftVisible && (
                <div className='absolute left-0 top-1/2 -translate-y-1/2 
                    bg-gradient-to-r from-white from-50% to-transparent w-24'>
                    <button
                        onClick={() => {
                            setTranslate(translate => {
                                const newTranslate = translate - TRANSLATE_VALUE
                                if (newTranslate <= 0) return 0
                                return newTranslate
                            })
                        }}
                        className='h-full aspect-square w-auto p-1.5'>
                        <ChevronLeft />
                    </button>
                </div>
            )}

            {isRightVisible && (
                <div className='absolute right-0 top-1/2 -translate-y-1/2
                        bg-gradient-to-l from-white from-50% to-transparent w-24 h-full flex justify-end'>
                    <button
                        onClick={() => {
                            setTranslate(translate => {
                                if(containerRef.current == null) return translate
                                const newTranslate = translate + TRANSLATE_VALUE
                                const edge = containerRef.current.scrollWidth
                                const width = containerRef.current.clientWidth

                                if (newTranslate + width >= edge) {
                                    return edge - width
                                }
                                return newTranslate
                            })
                        }}
                        className='h-full aspect-square w-auto p-1.5'>
                        <ChevronRight />
                    </button>
                </div>
            )}
        </div>
  )
}
