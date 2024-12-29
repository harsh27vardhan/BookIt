import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../components/BookingWidget";

const PlacePage = () => {
    const [place, setPlace] = useState(null);
    const { id } = useParams();
    useEffect(() => {
        if (!id) return;
        axios.get("/places/" + id).then((res) => {
            setPlace(res.data);
        });
    }, [id]);

    if (!place) return "";

    return (
        <div className="mt-8">
            <h1 className="text-3xl">{place.title}</h1>
            <a
                target="_blank"
                className="font-semibold underline"
                href={"https://maps.google.com/?q=" + place.address}
            >
                Go to Maps - {place.address}
            </a>
            <div className="grid gap-2 grid-cols-[2fr_1fr] my-4 rounded-2xl overflow-hidden">
                <div>
                    {place.photos?.[0] && (
                        <img
                            className="w-full object-cover"
                            src={`http://localhost:4000/uploads/${place.photos[0]}`}
                            alt=""
                        />
                    )}
                </div>
                <div className="grid">
                    {place.photos?.[1] && (
                        <img
                            className="w-full object-cover"
                            src={`http://localhost:4000/uploads/${place.photos[1]}`}
                            alt=""
                        />
                    )}
                    <div className="overflow-hidden">
                        {place.photos?.[2] && (
                            <img
                                className="w-full object-cover relative top-2"
                                src={`http://localhost:4000/uploads/${place.photos[2]}`}
                                alt=""
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 my-4 gap-4">
                <div>
                    <h2 className="font-semibold text-2xl">Description</h2>
                    {place.description}
                    <div className="mt-4">
                        Check-in: {place.checkIn} <br />
                        Check-out: {place.checkOut} <br />
                        Max number of Guests: {place.maxGuests}
                    </div>
                </div>
                <BookingWidget place={place} />
            </div>
            <div>
                <h2 className="font-semibold text-2xl mt-8">Extra Info</h2>
                <div className="text-gray-600 text-sm">
                    {place.extraInfo}
                </div>
            </div>
        </div>
    );
};

export default PlacePage;
