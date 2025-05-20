import Navbar from '../../components/Navbar'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <div className='flex items-center md:mt-32 mt-20 w-full h-screen flex-col'>
         <p className='text-6xl'>Welcome to the Future Transport</p><br/>
         <p className='text-6xl'>& Bookings</p>
         <Link to="/createbooking" className='py-4 px-8 mt-16 bg-[#1aac83] text-white cursor-pointer text-xl rounded-lg'>View Bookings</Link>
      </div>
    </div>
  )
}

export default Home