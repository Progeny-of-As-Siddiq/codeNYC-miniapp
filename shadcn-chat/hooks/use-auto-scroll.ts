import { useEffect, useRef, useState } from "react"

// How many pixels from the bottom of the container to enable auto-scroll
const ACTIVATION_THRESHOLD = 100
// Minimum pixels of scroll-up movement required to disable auto-scroll
const MIN_SCROLL_UP_THRESHOLD = 20

export function useAutoScroll(dependencies: React.DependencyList) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const previousScrollTop = useRef<number | null>(null)
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true)
  const prevDepLength = useRef<number>(Array.isArray(dependencies[0]) ? dependencies[0].length : 0)
  const userScrolled = useRef(false)

  const scrollToBottom = () => {
    if (containerRef.current && shouldAutoScroll) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current
      const distanceFromBottom = Math.abs(scrollHeight - scrollTop - clientHeight)

      // If user has scrolled up significantly, disable auto-scroll
      if (previousScrollTop.current && scrollTop < previousScrollTop.current - MIN_SCROLL_UP_THRESHOLD) {
        userScrolled.current = true
        setShouldAutoScroll(false)
      }

      // If user scrolls back to bottom, re-enable auto-scroll
      if (distanceFromBottom < ACTIVATION_THRESHOLD) {
        userScrolled.current = false
        setShouldAutoScroll(true)
      }

      previousScrollTop.current = scrollTop
    }
  }

  const handleTouchStart = () => {
    userScrolled.current = true
    setShouldAutoScroll(false)
  }

  useEffect(() => {
    if (containerRef.current) {
      previousScrollTop.current = containerRef.current.scrollTop
    }
  }, [])

  useEffect(() => {
    // Only auto-scroll if a new message was added and user hasn't manually scrolled
    const depArr = Array.isArray(dependencies[0]) ? dependencies[0] : dependencies;
    const prevLen = prevDepLength.current;
    const currLen = depArr.length;
    
    if (currLen > prevLen && !userScrolled.current) {
      scrollToBottom();
    }
    
    prevDepLength.current = currLen;
  }, dependencies)

  return {
    containerRef,
    scrollToBottom,
    handleScroll,
    shouldAutoScroll,
    handleTouchStart,
  }
}
