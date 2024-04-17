import { forecastType } from '../types'

export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES'
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES'

export const addToFavorites = (city: forecastType) => ({
  type: ADD_TO_FAVORITES,
  payload: city,
})

export const removeFromFavorites = (city: forecastType) => ({
  type: REMOVE_FROM_FAVORITES,
  payload: city,
})
