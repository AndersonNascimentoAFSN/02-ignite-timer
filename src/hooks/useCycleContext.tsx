import { useContext } from 'react'
import { CyclesContext } from '../contexts/CycleContext'

export function useCycleContext() {
  return useContext(CyclesContext)
}
