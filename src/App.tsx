import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import FavoriteCities from './components/FavoriteCities'
import Forecast from './components/Forecast'
import Search from './components/Search'
import useForecast from './hooks/useForecast'
import Navbar from './components/Navbar'

const App = (): JSX.Element => {
  const {
    fiveDaily,
    forecast,
    options,
    term,
    onOptionSelect,
    onSubmit,
    onInputChange,
  } = useForecast()

  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Navbar />
        <div className="flex flex-col items-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 min-h-screen w-full">
          <Routes>
            <Route path="/favorites" element={<FavoriteCities />} />
            <Route
              path="/"
              element={
                <div className="flex flex-col items-center">
                  <Search
                    term={term}
                    options={options}
                    onInputChange={onInputChange}
                    onOptionSelect={onOptionSelect}
                    onSubmit={onSubmit}
                  />
                  {forecast && (
                    <Forecast data={forecast} fivedaily={fiveDaily} />
                  )}
                </div>
              }
            />
          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App
