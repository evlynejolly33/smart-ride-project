import Navbar from '../../components/Navbar'
import useCreateBook from '../../hooks/useCreateBooking'

const CreateBooking = () => {
  const {
    driver, setDriver,
    pickUpLocation, setPickUpLocation,
    dropoffLocation, setDropoffLocation,
    date, setDate,
    message,
    drivers,
    handleBookingSubmit
  } = useCreateBook()

  return (
    <div>
      <Navbar />
      <div className="max-w-lg mx-auto p-4 mt-6 shadow rounded-lg bg-white">
        <h2 className="text-2xl font-bold mb-4">Create a New Booking</h2>
        {message && (
          <p className={`mb-3 ${
            message.includes("successfully") 
              ? "text-green-500" 
              : "text-red-500"
          }`}>
            {message}
          </p>
        )}

        <form onSubmit={handleBookingSubmit}>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Select Driver</label>
            <select
              className="w-full border rounded p-2"
              value={driver}
              onChange={(e) => setDriver(e.target.value)}
              required
            >
              <option value="">-- Choose Driver --</option>
              {drivers.map((driver) => (
                <option key={driver._id} value={driver._id}>
                  {driver.name} - {driver.vehicleNumber} ({driver.status})
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">Pickup Location</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              value={pickUpLocation}
              onChange={(e) => setPickUpLocation(e.target.value)}
              placeholder="Enter pickup location"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">Dropoff Location</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              value={dropoffLocation}
              onChange={(e) => setDropoffLocation(e.target.value)}
              placeholder="Enter dropoff location"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">Ride Date & Time</label>
            <input
              type="datetime-local"
              className="w-full border rounded p-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded p-2 mt-2 hover:bg-blue-700 transition"
          >
            Book Ride
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateBooking