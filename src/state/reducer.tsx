import { forecastType } from '../types'
import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from './actions'

const initialState = {
  favorites: [] as forecastType[],
}

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      }
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter((city) => city !== action.payload),
      }
    default:
      return state
  }
}

export default reducer
