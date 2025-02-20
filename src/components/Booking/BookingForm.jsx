import { db } from "../../firebase"; // Import Firebase
import { collection, addDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";

// Approximate distances (in KM) between locations in Karachi
const distanceMap = {
  Clifton: { Saddar: 5, DHA: 4, Gulshan: 12, NorthNazimabad: 18, Korangi: 15, Malir: 22 },
  Saddar: { Clifton: 5, DHA: 7, Gulshan: 8, NorthNazimabad: 12, Korangi: 14, Malir: 20 },
  DHA: { Clifton: 4, Saddar: 7, Gulshan: 14, NorthNazimabad: 20, Korangi: 10, Malir: 18 },
  Gulshan: { Clifton: 12, Saddar: 8, DHA: 14, NorthNazimabad: 10, Korangi: 12, Malir: 16 },
  NorthNazimabad: { Clifton: 18, Saddar: 12, DHA: 20, Gulshan: 10, Korangi: 22, Malir: 28 },
  Korangi: { Clifton: 15, Saddar: 14, DHA: 10, Gulshan: 12, NorthNazimabad: 22, Malir: 10 },
  Malir: { Clifton: 22, Saddar: 20, DHA: 18, Gulshan: 16, NorthNazimabad: 28, Korangi: 10 },
};

// Price per KM for each car model
const carPrices = {
  "Toyota Corolla": 50,
  "Honda Civic": 60,
  "Suzuki Alto": 40,
  "BMW UX": 80,
  "KIA Sportage": 70,
};

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    carModel: "",
    pickupLocation: "",
    dropLocation: "",
  });

  const [distance, setDistance] = useState(0);
  const [price, setPrice] = useState(0);

  // Handle form inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Calculate distance & price when locations or car model changes
  useEffect(() => {
    if (formData.pickupLocation && formData.dropLocation && formData.carModel) {
      const pickup = formData.pickupLocation;
      const drop = formData.dropLocation;

      // Ensure locations are different
      if (pickup !== drop) {
        const distanceValue = distanceMap[pickup]?.[drop] || distanceMap[drop]?.[pickup] || 0;
        setDistance(distanceValue);

        // Calculate price
        const perKmPrice = carPrices[formData.carModel] || 0;
        setPrice(distanceValue * perKmPrice);
      } else {
        setDistance(0);
        setPrice(0);
      }
    }
  }, [formData.pickupLocation, formData.dropLocation, formData.carModel]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (distance === 0) {
      alert("Please select different pickup and drop locations.");
      return;
    }

    try {
      const bookingData = { ...formData, distance, price };
      await addDoc(collection(db, "bookings"), bookingData);
      alert("Booking successful!");
      setFormData({ name: "", email: "", phone: "", carModel: "", pickupLocation: "", dropLocation: "" });
      setDistance(0);
      setPrice(0);
    } catch (error) {
      console.error("Error adding booking: ", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Book a Car</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="border p-2 rounded" />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="border p-2 rounded" />
        <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required className="border p-2 rounded" />

        {/* Car Model Dropdown */}
        <select name="carModel" value={formData.carModel} onChange={handleChange} required className="border p-2 rounded">
          <option value="">Select Car Model</option>
          {Object.keys(carPrices).map((car, index) => (
            <option key={index} value={car}>{car}</option>
          ))}
        </select>

        {/* Pickup Location Dropdown */}
        <select name="pickupLocation" value={formData.pickupLocation} onChange={handleChange} required className="border p-2 rounded">
          <option value="">Select Pickup Location</option>
          {Object.keys(distanceMap).map((area, index) => (
            <option key={index} value={area}>{area}</option>
          ))}
        </select>

        {/* Drop Location Dropdown */}
        <select name="dropLocation" value={formData.dropLocation} onChange={handleChange} required className="border p-2 rounded">
          <option value="">Select Drop Location</option>
          {Object.keys(distanceMap).map((area, index) => (
            <option key={index} value={area}>{area}</option>
          ))}
        </select>

        {/* Display Distance & Price */}
        {distance > 0 && (
          <div className="p-2 bg-gray-100 rounded">
            <p><strong>Distance:</strong> {distance} KM</p>
            <p><strong>Estimated Price:</strong> RS {price}</p>
          </div>
        )}

        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Submit Booking</button>
      </form>
    </div>
  );
};

export default BookingForm;
