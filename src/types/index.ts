export type optionType = {
  LocalizedName: string
  Country: {
    LocalizedName: string
  }
  Key: number
}

export type forecastType = {
  option: optionType
  time: Date
  weatherText: string
  WeatherIcon: number
  Temperature: {
    Metric: {
      Value: number
      Unit: 'C'
    }
    Imperial: {
      Value: number
      Unit: 'F'
    }
  }
}
type DailyForecastItemType = {
  Date: Date
  EpochDate: number
  Temperature: {
    Minimum: {
      Value: number
      Unit: 'C'
      UnitType: number
    }
    Maximum: {
      Value: number
      Unit: 'C'
      UnitType: number
    }
  }
  Day: {
    Icon: number
    IconPhrase: string
    HasPrecipitation: boolean
  }
  Night: {
    Icon: number
    IconPhrase: string
    HasPrecipitation: boolean
  }
  Sources: string[]
  MobileLink: string
  Link: string
}

export type DailyForecastsType = DailyForecastItemType[]
