import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = (): JSX.Element => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-semibold">
          Home
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link to="/favorites" className="text-white hover:text-gray-300">
              Favorites
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
