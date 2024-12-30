import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AccountNav from '../components/AccountNav';
import { differenceInCalendarDays, format } from 'date-fns';

const BookingPage = () => {
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        async function fetchBookings() {
            const response = await axios.get("/bookings");
            setBookings(response.data);
        }
        fetchBookings();
    }, [])
    return (
        <div className='flex flex-col gap-4'>
            <AccountNav />
            {bookings.length > 0 && bookings.map((booking, index) => (
                <div key={index} className='flex gap-4 bg-gray-100 rounded-2xl overflow-hidden'>
                    <div className='w-48'>
                        <img src={"https://bookit-8xdu.onrender.com/uploads/" + booking.placeId.photos?.[0]} className='h-full' alt="" />
                    </div>
                    <div className='py-3 pr-3 grow'>
                        <h2 className='text-2xl font-semibold'>{booking.placeId.title}</h2>
                        <div className='font-semibold border-t border-black mt-2 py-2'>
                            📆{format(new Date(booking.checkIn), "yyyy-MM-dd")} &rarr; 📆{format(new Date(booking.checkOut), "yyyy-MM-dd")}
                        </div>
                        <div className='font-semibold text-xl'>
                            🌙{differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} nights
                        </div>
                        <div className='font-semibold text-xl'>
                            💵Total Price : ₹ {booking.price}
                        </div>
                    </div>
                </div>
            ))
            }
        </div >
    )
}

export default BookingPage
