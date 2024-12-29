import React, { useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";

const BookingWidget = ({ place }) => {
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [numberOfGuests, setNumberOfGuests] = useState("");
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [redirect, setRedirect] = useState(false);
    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(
            new Date(checkOut),
            new Date(checkIn)
        );
    }

    async function bookThisPlace() {
        const data = {
            checkIn,
            checkOut,
            numberOfGuests,
            name,
            mobile,
            placeId: place._id,
            price: numberOfNights * place.price,
        };
        const response = await axios.post("/booking", data);
        if (response.status !== 200) {
            alert("Failed to book the place. Please try again later.");
            return;
        }
        setRedirect(true);
    }
    if (redirect) {
        return <Navigate to={"/account/bookings"} />
    }
    return (
        <div className="p-4 shadow-lg rounded-2xl bg-gray-200 gap-4 flex flex-col">
            <h2 className="text-2xl text-center">
                Price: ₹ {place.price} / night <br />
            </h2>
            <div className=" p-2 border rounded-2xl bg-white">
                <div className="my-2">
                    <label className="font-semibold" htmlFor="">
                        Check in:
                    </label>
                    <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                    />
                </div>
                <div className="my-2">
                    <label className="font-semibold" htmlFor="">
                        Check out:
                    </label>
                    <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                    />
                </div>
                <div className="my-2">
                    <label className="font-semibold" htmlFor="">
                        Number of Guests:
                    </label>
                    <input
                        type="number"
                        value={numberOfGuests}
                        onChange={(e) => setNumberOfGuests(e.target.value)}
                    />
                </div>
                {numberOfNights > 0 && (
                    <div className="py-3 px-4 border-t">
                        <label htmlFor="">Your full name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label htmlFor="">Your Mobile number:</label>
                        <input
                            type="text"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                        />
                    </div>
                )}
            </div>
            <button onClick={bookThisPlace} className="primary">
                Book this Place
                {numberOfNights > 0 && (
                    <span className="ml-2">₹{numberOfNights * place.price}</span>
                )}
            </button>
        </div>
    );
};

export default BookingWidget;
