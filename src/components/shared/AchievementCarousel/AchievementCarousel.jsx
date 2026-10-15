import { useLayoutEffect, useRef, useState } from 'react'
import './AchievementCarousel.css'

export default function AchievementCarousel({ slideCount, renderSlide }) {
  const carouselRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const isJumpingRef = useRef(false)
  const scrollTimeoutRef = useRef(null)

  // Extended slide order for a looping carousel: [clone-of-last, ...real slides, clone-of-first]
  const extendedIndexes = [slideCount - 1, ...Array.from({ length: slideCount }, (_, i) => i), 0]

  useLayoutEffect(() => {
    const el = carouselRef.current
    if (!el) return
    el.scrollLeft = el.clientWidth
  }, [])

  const handleScroll = () => {
    const el = carouselRef.current
    if (!el || el.clientWidth === 0) return
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    scrollTimeoutRef.current = setTimeout(() => {
      if (isJumpingRef.current) return
      const domIndex = Math.round(el.scrollLeft / el.clientWidth)
      if (domIndex <= 0) {
        isJumpingRef.current = true
        el.scrollLeft = el.clientWidth * slideCount
        setActiveIndex(slideCount - 1)
        requestAnimationFrame(() => {
          isJumpingRef.current = false
        })
      } else if (domIndex >= slideCount + 1) {
        isJumpingRef.current = true
        el.scrollLeft = el.clientWidth
        setActiveIndex(0)
        requestAnimationFrame(() => {
          isJumpingRef.current = false
        })
      } else {
        setActiveIndex(domIndex - 1)
      }
    }, 120)
  }

  const scrollToIndex = (realIndex) => {
    const el = carouselRef.current
    if (!el) return
    el.scrollTo({ left: (realIndex + 1) * el.clientWidth, behavior: 'smooth' })
    setActiveIndex(realIndex)
  }

  return (
    <div className="ac-card">
      <div className="ac-track" ref={carouselRef} onScroll={handleScroll}>
        {extendedIndexes.map((realIndex, domIndex) => (
          <div
            className="ac-slide"
            key={`${domIndex}-${realIndex}`}
            aria-hidden={domIndex === 0 || domIndex === extendedIndexes.length - 1}
          >
            {renderSlide(realIndex)}
          </div>
        ))}
      </div>
      <div className="ac-dots">
        {Array.from({ length: slideCount }, (_, index) => (
          <button
            key={index}
            type="button"
            className={`ac-dot${index === activeIndex ? ' ac-dot--active' : ''}`}
            aria-label={`Go to card ${index + 1}`}
            onClick={() => scrollToIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}
