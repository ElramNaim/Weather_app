import Degree from './Degree'
import { getDayOfWeek, formatTwoDigitNumber } from './../helpers'
import { connect } from 'react-redux'
import { addToFavorites, removeFromFavorites } from '../state/actions'

import { forecastType, DailyForecastsType } from '../types'

type Props = {
  data: forecastType
  fivedaily: DailyForecastsType | []
  favorites: forecastType[]
  addToFavorites: (city: forecastType) => void
  removeFromFavorites: (city: forecastType) => void
}

const Forecast = ({
  data,
  fivedaily,
  favorites,
  addToFavorites,
  removeFromFavorites,
}: Props) => {
  const isFavorite = favorites.includes(data)

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFromFavorites(data)
    } else {
      addToFavorites(data)
    }
  }
  return (
    <div className="relative w-full md:max-w-[500px] py-4 md:py-4 md:px-10 lg:px-24 h-full lg:h-auto bg-white bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg border-ridge border-2">
      <button onClick={handleFavoriteToggle}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
      <div className="mx-auto w-[300px]">
        <section className="text-center">
          <h2 className="text-2xl font-black">
            {data.option.LocalizedName}{' '}
            <span className="font-thin">
              {data.option.Country.LocalizedName}
            </span>
          </h2>
          <h1 className="text-4xl font-extrabold">
            <Degree temp={Math.round(data.Temperature.Metric.Value)} />
          </h1>
          <div className="ml-28">
            <img
              src={`https://developer.accuweather.com/sites/default/files/${formatTwoDigitNumber(
                data.WeatherIcon
              )}-s.png`}
              width="40%"
            />
          </div>
          <h3 className="text-2xl font-black">{data.weatherText}</h3>
        </section>
        <div className="flex">
          {fivedaily.map((item, i) => (
            <div key={i} className="flex flex-col items-center mr-4 w-40">
              <div className="flex flex-col items-center space-y-3">
                <span className="text-sm mb-2">
                  {i === 0 ? 'NOW' : getDayOfWeek(item.Date)}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-8 h-8 fill-current"
                >
                  <image
                    href={`https://developer.accuweather.com/sites/default/files/${formatTwoDigitNumber(
                      item.Day.Icon
                    )}-s.png`}
                    width="512"
                    height="512"
                  />
                </svg>

                <span>{item.Temperature.Minimum.Value}°C</span>
                <span>{item.Temperature.Maximum.Value}°C</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  favorites: state.favorites,
})

export default connect(mapStateToProps, {
  addToFavorites,
  removeFromFavorites,
})(Forecast)
