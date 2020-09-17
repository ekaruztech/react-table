import { useEffect, useState } from 'react'

interface UseDimension {
  height: number
  width: number
}

const useDimension = (
  type: 'window' | 'element' = 'window',
  elementId: string = ''
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
      if (elementId) {
        const element = document.getElementById(elementId)
        setDimension({
          height: element?.offsetHeight || 0,
          width: element?.offsetWidth || 0
        })
      }
    }
    handleInitialDimension()

    const handleDimensionChange = () => {
      if (type === 'element' && elementId) {
        const element = document.getElementById(elementId)
        setDimension({
          height: element?.offsetHeight || 0,
          width: element?.offsetWidth || 0
        })
      }
    }
    if (type === 'element' && elementId) {
      window.addEventListener('resize', handleDimensionChange)
    }

    return () =>
      type === 'element' && elementId
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

export { toPercentage, useDimension }
