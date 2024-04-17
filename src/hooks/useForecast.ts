import { useState, useEffect, ChangeEvent } from 'react'

import { optionType, forecastType, DailyForecastsType } from './../types/index'

const BASE_URL = 'https://dataservice.accuweather.com'

const useForecast = () => {
  const [city, setCity] = useState<optionType | null>(null)
  const [term, setTerm] = useState<string>('')
  const [options, setOptions] = useState<[]>([])
  const [forecast, setForecast] = useState<forecastType | null>(null)
  const [fiveDaily, setFiveDaily] = useState<DailyForecastsType>([])

  const getSearchOptions = async (term: string) => {
    fetch(
      `${BASE_URL}/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_API_KEY}&q=${term}`
    )
      .then((res) => res.json())
      .then((data) => setOptions(data))
      .catch((e) => console.log({ e }))
  }

  const onSubmit = () => {
    if (!city) return

    getForecast(city)
    get_five_daily_weather(city, setFiveDaily)
  }

  const getForecast = (data: optionType) => {
    fetch(
      `${BASE_URL}/currentconditions/v1/${data.Key}?apikey=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((result) => {
        const metricValue = result[0].Temperature
        const weatherText = result[0].WeatherText
        const WeatherIcon = result[0].WeatherIcon
        const curr_date = result[0].LocalObservationDateTime
        const forecastData = {
          option: data,
          time: curr_date,
          WeatherIcon: WeatherIcon,
          weatherText: weatherText,
          Temperature: metricValue,
        }

        setForecast(forecastData)
      })
      .catch((e) => console.log({ e }))
  }
  const get_five_daily_weather = (
    data: optionType,
    setFiveDaily: (dailyForecasts: DailyForecastsType) => void
  ) => {
    fetch(
      `${BASE_URL}/forecasts/v1/daily/5day/${data.Key}?apikey=${process.env.REACT_APP_API_KEY}&metric=true`
    )
      .then((res) => res.json())
      .then((result: { DailyForecasts: DailyForecastsType }) => {
        setFiveDaily(result.DailyForecasts)
      })
      .catch((error) =>
        console.error('Error fetching daily weather data:', error)
      )
  }

  const onOptionSelect = (option: optionType) => {
    setCity(option)
    setTerm(option.LocalizedName)
    setOptions([])
  }

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setTerm(e.target.value)

    if (value !== '') {
      getSearchOptions(value)
    }
  }

  useEffect(() => {
    fetch(
      `${BASE_URL}/locations/v1/cities/geoposition/search?apikey=${process.env.REACT_APP_API_KEY}&q=32.065%2C34.785&toplevel=true`
    )
      .then((res) => res.json())
      .then((data) => {
        const name = data.AdministrativeArea.LocalizedName
        const country = data.Country
        const key = data.Key
        const City_val = {
          LocalizedName: name,
          Country: country,
          Key: key,
        }
        setCity(City_val)
        getForecast(data)
        get_five_daily_weather(data, setFiveDaily)
      })
      .catch((error) => console.error('Error fetching default city:', error))
  }, [])

  useEffect(() => {
    console.log('city', city)
    if (city) {
      setTerm(city.LocalizedName)
      setOptions([])
    }
  }, [city])

  return {
    fiveDaily,
    forecast,
    options,
    term,
    onOptionSelect,
    onSubmit,
    onInputChange,
  }
}

export default useForecast
