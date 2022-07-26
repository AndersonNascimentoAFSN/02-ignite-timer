import { ReactNode, createContext, useState, useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'
import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from '../../reducers/cycles/actions'
import { ICycle, cyclesReducer } from '../../reducers/cycles/reducer'

interface ICreateCycleData {
  task: string
  minutesAmount: number
}

interface ICyclesContextType {
  cycles: ICycle[]
  activeCycle: ICycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  definedAmountSecondsPassed: (secondsPassed: number) => void
  createNewCyclo: (data: ICreateCycleData) => void
  interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as ICyclesContextType)

interface ICyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({
  children,
}: ICyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  })

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  function definedAmountSecondsPassed(secondsPassed: number) {
    setAmountSecondsPassed(secondsPassed)
  }

  function createNewCyclo(data: ICreateCycleData) {
    const newCycle: ICycle = {
      id: uuidv4(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))

    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction())
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction())
  }

  const { cycles, activeCycleId } = cyclesState

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        definedAmountSecondsPassed,
        createNewCyclo,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
