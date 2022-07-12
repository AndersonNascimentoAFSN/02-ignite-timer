import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import {
  CountDownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountButton,
  TaskInput,
} from './styles'

const newCycloFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O valor deve ser maior ou igual a 5')
    .max(999, 'O valor deve ser menor ou igual a 999')
    .step(5),
})

// type newCycloFormData = typeof newCycloFormValidationSchema

// interface newCycleFormData {
//   task: string
//   minutesAmount: number
// }

type newCycloFormData = zod.infer<typeof newCycloFormValidationSchema>

export function Home() {
  const { register, handleSubmit, watch, reset /* formState */ } =
    useForm<newCycloFormData>({
      resolver: zodResolver(newCycloFormValidationSchema),
      defaultValues: {
        task: '',
        minutesAmount: 0,
      },
    })

  function handleCreateNewCyclo(data: newCycloFormData) {
    console.log(data)
    reset()
  }

  const isSubmitDisabled = !watch('task') || !watch('minutesAmount')

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCyclo)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            type="text"
            placeholder="Dê um nome para o seu projeto"
            list="task-suggestions"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            min={5}
            step={5}
            max={999}
            placeholder="00"
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <StartCountButton type="submit" disabled={isSubmitDisabled}>
          <Play size={24} />
          Começar
        </StartCountButton>
      </form>
    </HomeContainer>
  )
}
