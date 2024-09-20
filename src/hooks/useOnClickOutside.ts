import {  RefObject, useEffect } from 'react'

export const useOnClickOutside = (ref: RefObject<HTMLElement>, callback: () => void) => {
  const handleClick = (event: any) => {
    if (ref.current && !ref.current.contains(event.target))
      callback()
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClick)
    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  })
}