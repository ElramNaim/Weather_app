import React from 'react'
import { connect } from 'react-redux'
import { forecastType } from '../types'
import { getDayOfWeek, formatTwoDigitNumber } from './../helpers'

type Props = {
  favorites: forecastType[]
}

const FavoriteCities: React.FC<Props> = ({ favorites }) => {
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-semibold mb-4">Favorite Cities</h2>
      <ul className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {favorites.map((city, index) => (
          <li key={index} className="bg-white shadow-md rounded-md p-4">
            <p className="text-lg font-semibold">{city.option.LocalizedName}</p>
            <p className="text-lg font-semibold">
              {city.Temperature.Metric.Value}
              {city.Temperature.Metric.Unit}
            </p>
            <div className="ml-28">
              <img
                src={`https://developer.accuweather.com/sites/default/files/${formatTwoDigitNumber(
                  city.WeatherIcon
                )}-s.png`}
                width="40%"
              />
              {city.weatherText}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  favorites: state.favorites,
})

export default connect(mapStateToProps)(FavoriteCities)
