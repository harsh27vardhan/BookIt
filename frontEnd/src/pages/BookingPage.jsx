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
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>

                {bookings.length > 0 && bookings.map((booking, index) => (
                    <div key={index} className='booking-div flex gap-4 bg-gray-100 rounded-2xl overflow-hidden'>
                        <div className='w-48'>
                            <img src={booking.placeId.photos?.[0]} className='h-full' alt="" />
                        </div>
                        <div className='py-3 pr-3 grow'>
                            <h2 id='booking-heading' className='text-2xl font-semibold'>{booking.placeId.title}</h2>
                            <div className='booking-dates font-semibold border-t border-gray-300 mt-2 py-2'>
                                <p>📆{format(new Date(booking.checkIn), "yyyy-MM-dd")}</p>
                                <p>&rarr;</p>
                                <p>📆{format(new Date(booking.checkOut), "yyyy-MM-dd")}</p>
                            </div>
                            <div className='booking-dates font-semibold text-xl'>
                                🌙{differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} nights
                            </div>
                            <div className='booking-price font-semibold text-xl'>
                                <p>💵Total Price :</p>
                                <p>₹ {booking.price}</p>
                            </div>
                        </div>
                    </div>
                ))
                }
            </div>
        </div >
    )
}

export default BookingPage
