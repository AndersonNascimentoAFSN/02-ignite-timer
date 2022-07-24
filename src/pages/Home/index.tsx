import { createContext, useState } from 'react'
import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { v4 as uuidv4 } from 'uuid'

import { HomeContainer, StartCountButton, StopCountButton } from './styles'
import { NewCycleForm } from './NewCycleForm'
import { Countdown } from './Countdown'

const newCycloFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O valor deve ser maior ou igual a 5')
    .max(999, 'O valor deve ser menor ou igual a 999')
    .step(1),
})

// type newCycloFormData = typeof newCycloFormValidationSchema

// interface newCycleFormData {
//   task: string
//   minutesAmount: number
// }

type newCycloFormData = zod.infer<typeof newCycloFormValidationSchema>

interface ICycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesContextType {
  activeCycle: ICycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  resetActiveCycles: () => void
  definedAmountSecondsPassed: (secondsPassed: number) => void
}

export const CyclesContext = createContext({} as CyclesContextType)

export function Home() {
  const [cycles, setCycles] = useState<ICycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const newCycleForm = useForm<newCycloFormData>({
    resolver: zodResolver(newCycloFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId)
          return { ...cycle, finishedDate: new Date() }
        return cycle
      }),
    )
  }

  function resetActiveCycles() {
    setActiveCycleId(null)
  }

  function definedAmountSecondsPassed(secondsPassed: number) {
    setAmountSecondsPassed(secondsPassed)
  }

  function handleCreateNewCyclo(data: newCycloFormData) {
    const newCycle: ICycle = {
      id: uuidv4(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((cycles) => [...cycles, newCycle])
    setActiveCycleId(newCycle.id)
    setAmountSecondsPassed(0)
    reset()
  }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId)
          return { ...cycle, interruptedDate: new Date() }
        return cycle
      }),
    )
    setActiveCycleId(null)
  }

  const isSubmitDisabled = !watch('task') || !watch('minutesAmount')

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCyclo)}>
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            markCurrentCycleAsFinished,
            resetActiveCycles,
            amountSecondsPassed,
            definedAmountSecondsPassed,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <StopCountButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountButton>
        ) : (
          <StartCountButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Começar
          </StartCountButton>
        )}
      </form>
    </HomeContainer>
  )
}
