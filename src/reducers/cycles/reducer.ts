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
      // return {
      //   ...state,
      //   cycles: [...state.cycles, action.payload.newCycle],
      //   activeCycleId: action.payload.newCycle.id,
      // }
      return produce(state, (draft) => {
        // with immer
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleId = action.payload.newCycle.id
      })

    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
      // return {
      //   ...state,
      //   cycles: state.cycles.map((cycle) => {
      //     if (cycle.id === state.activeCycleId) {
      //       return {
      //         ...cycle,
      //         finishedDate: new Date(),
      //       }
      //     }
      //     return cycle
      //   }),
      //   activeCycleId: null,
      // }
      return produce(state, (draft) => {
        draft.cycles.forEach((cycle) => {
          if (cycle.id === draft.activeCycleId) {
            cycle.finishedDate = new Date()
          }
        })
        draft.activeCycleId = null
      })

    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.activeCycleId,
      )
      if (currentCycleIndex < 0) return state
      return produce(state, (draft) => {
        draft.activeCycleId = null
        draft.cycles[currentCycleIndex].interruptedDate = new Date()
      })

      // return {
      //   ...state,
      //   cycles: state.cycles.map((cycle) => {
      //     if (cycle.id === state.activeCycleId) {
      //       return {
      //         ...cycle,
      //         interruptedDate: new Date(),
      //       }
      //     }
      //     return cycle
      //   }),
      //   activeCycleId: null,
      // }
    }

    default:
      return state
  }
}
