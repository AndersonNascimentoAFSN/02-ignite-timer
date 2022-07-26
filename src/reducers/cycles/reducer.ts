import { produce } from 'immer'
import { ActionTypes } from './actions'

export interface ICycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface ICycleState {
  cycles: ICycle[]
  activeCycleId: string | null
}

// type type =
//   | 'ADD_NEW_CYCLE'
//   | 'MARK_CURRENT_CYCLE_AS_FINISHED'
//   | 'INTERRUPT_CURRENT_CYCLE'

// interface IAction {
//   type: type
//   payload?: {
//     newCycle: ICycle
//   }
// }

export function cyclesReducer(state: ICycleState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id,
      }

    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return {
              ...cycle,
              finishedDate: new Date(),
            }
          }
          return cycle
        }),
        activeCycleId: null,
      }

    case ActionTypes.INTERRUPT_CURRENT_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return {
              ...cycle,
              interruptedDate: new Date(),
            }
          }
          return cycle
        }),
        activeCycleId: null,
      }

    default:
      return state
  }
}
