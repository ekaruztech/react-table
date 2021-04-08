import { useEffect, useState } from 'react'

interface UseDimension {
  height: number
  width: number
}

const useDimension = (
  type: 'window' | 'element' = 'window',
  domElement: string | HTMLElement = ''
): UseDimension => {
  const [dimension, setDimension] = useState({
    height: 0,
    width: 0
  })
  // @ts-ignore
  useEffect(() => {
    if (type === 'window') {
      setDimension({ height: window.innerHeight, width: window.innerWidth })
    }
    const handleDimensionChange = () => {
      if (type === 'window') {
        setDimension({ height: window.innerHeight, width: window.innerWidth })
      }
    }
    if (type === 'window') {
      window.addEventListener('resize', handleDimensionChange)
    }

    return () =>
      type === 'window'
        ? window.removeEventListener('resize', handleDimensionChange)
        : null
  }, [])

  // @ts-ignore
  useEffect(() => {
    const handleInitialDimension = () => {
      if (domElement && typeof domElement === 'string') {
        const element = document.getElementById(domElement)
        setDimension({
          height: element?.clientWidth || 0,
          width: element?.clientWidth || 0
        })
      }
      if (
        domElement &&
        typeof domElement !== 'string' &&
        typeof HTMLElement === 'object' &&
        domElement instanceof HTMLElement
      ) {
        setDimension({
          height: domElement?.clientWidth || 0,
          width: domElement?.clientWidth || 0
        })
      }
    }
    handleInitialDimension()

    const handleDimensionChange = () => {
      if (type === 'element' && domElement) {
        if (domElement && typeof domElement === 'string') {
          const element = document.getElementById(domElement)
          setDimension({
            height: element?.clientWidth || 0,
            width: element?.clientWidth || 0
          })
        }
        if (
          domElement &&
          typeof domElement !== 'string' &&
          typeof HTMLElement === 'object' &&
          domElement instanceof HTMLElement
        ) {
          setDimension({
            height: domElement?.clientWidth || 0,
            width: domElement?.clientWidth || 0
          })
        }
      }
    }
    if (type === 'element' && domElement) {
      window.addEventListener('resize', handleDimensionChange)
    }

    return () =>
      type === 'element' && domElement
        ? window.removeEventListener('resize', handleDimensionChange)
        : null
  }, [])

  return dimension
}

const toPercentage = (
  size: number = 1,
  expectedRatio: number = 1,
  sub: number = 0,
  add: number = 0
): number => size * expectedRatio - sub + add

const useScroll = (scrollEventCallback: () => void) => {
  useEffect(() => {
    const scrollFn = () => {
      if (typeof scrollEventCallback === 'function') {
        scrollEventCallback()
      }
    }
    window.addEventListener('scroll', scrollFn)

    return () => window.removeEventListener('scroll', scrollFn)
  }, [])
}
export { toPercentage, useDimension, useScroll }
