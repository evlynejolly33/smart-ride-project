import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';

const ViewDrivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDrivers = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You must be logged in to view drivers.");
        return;
      }

      try {
        const response = await fetch("http://localhost:7000/api/v1/drivers/view", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Failed to fetch drivers.");
        } else {
          setDrivers(data);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch drivers.");
      }
    };

    fetchDrivers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-[#1aac83]">All Drivers</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1aac83] text-white">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">VehicleNumber</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {drivers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-500">
                    No drivers found.
                  </td>
                </tr>
              ) : (
                drivers.map((driver) => (
                  <tr key={driver._id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-bold">{driver.name}</td>
                    <td className="p-4">{driver.email}</td>
                    <td className="p-4 font-bold">{driver.phoneNumber}</td>
                    <td className="p-4 font-bold">{driver.vehicleNumber}</td>
                    <td className={`p-4 font-medium ${driver.status === 'available' ? 'text-green-600' : 'text-red-600'}`}>
                      {driver.status}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewDrivers;
