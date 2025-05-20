import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"))
    setUser(storedUser)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    navigate("/login");
  }

  return (
    <header className='p-6 bg-white shadow-md'>
      <nav className='flex items-center justify-between w-full'>
        {/* Logo */}
        <div>
          <h1 className='text-3xl font-bold text-[#1aac83]'>SmartRide</h1>
        </div>

        {/* Desktop Nav */}
        <ul className='hidden md:flex space-x-10 text-xl'>
          <li className="cursor-pointer hover:text-[#1aac83]"><Link to="/">Home</Link></li>

          {user && (
            <>
              <li className="cursor-pointer hover:text-[#1aac83]"><Link to="/viewBooking">Bookings</Link></li>

              {user.role === 'admin' && (
                <>
                  <li className="cursor-pointer hover:text-[#1aac83]"><Link to="/viewDrivers">Drivers</Link></li>
                  <li className="cursor-pointer hover:text-[#1aac83]"><Link to="/viewCustomers">Customers</Link></li>
                </>
              )}
            </>
          )}
        </ul>

        {/* Logout button (desktop only) */}
        {user && (
          <div className='hidden md:block'>
            <button onClick={handleLogout} className='bg-[#1aac83] text-white py-2 px-5 rounded-md hover:bg-[#15996f]'>
              Logout
            </button>
          </div>
        )}

        {/* Mobile menu button */}
        <div className='md:hidden'>
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className='md:hidden mt-4 flex flex-col items-start space-y-4 text-xl'>
          <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-[#1aac83]">Home</Link>

          {user && (
            <>
              <Link to="/viewBooking" onClick={() => setMenuOpen(false)} className="hover:text-[#1aac83]">Bookings</Link>

              {user.role === 'admin' && (
                <>
                  <Link to="/viewDrivers" onClick={() => setMenuOpen(false)} className="hover:text-[#1aac83]">Drivers</Link>
                  <Link to="/viewCustomers" onClick={() => setMenuOpen(false)} className="hover:text-[#1aac83]">Customers</Link>
                </>
              )}

              <button 
                onClick={() => { handleLogout(); setMenuOpen(false) }} 
                className='bg-[#1aac83] text-white py-2 px-5 rounded-md hover:bg-[#15996f]'
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  )
}

export default Navbar
