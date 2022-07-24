import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { HomeContainer, StartCountButton, StopCountButton } from './styles'
import { NewCycleForm } from './NewCycleForm'
import { Countdown } from './Countdown'
import { useCycleContext } from '../../hooks/useCycleContext'

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

export function Home() {
  const { createNewCyclo, interruptCurrentCycle, activeCycle } =
    useCycleContext()

  const newCycleForm = useForm<newCycloFormData>({
    resolver: zodResolver(newCycloFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCyclo(data: newCycloFormData) {
    createNewCyclo(data)
    reset()
  }

  const isSubmitDisabled = !watch('task') || !watch('minutesAmount')

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCyclo)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountButton type="button" onClick={interruptCurrentCycle}>
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
