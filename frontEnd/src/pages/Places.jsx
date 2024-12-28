import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import plusImg from "../assets/images/plus.svg";
import AccountNav from "../components/AccountNav";
import axios from "axios";

const Places = () => {
    // console.log(action);
    const [price, setPrice] = useState(100);
    const [places, setPlaces] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("/places").then(({ data }) => {
            setPlaces(data);
        })
    }, [])

    return (
        <div>
            <AccountNav />
            <div className="text-center">
                <br />
                <Link
                    className="inline-flex gap-1 bg-primary items-center text-white py-2 px-4 rounded-full"
                    to={"/account/places/new"}
                >
                    <img className="h-6" src={plusImg} alt="" />
                    Add new location
                </Link>
            </div>
            <div>
                {places.length > 0 && (
                    places.map((place, index) => (
                        <div onClick={() => {
                            console.log("div clicked..");
                            navigate('/account/places/' + place._id)
                        }} key={index} className="border border-gray-300 bg-gray-100 p-4 rounded-xl gap-4 mt-4 w-full">
                            <h2 className="text-xl bold">{place.title}</h2>
                            <div className="flex flex-wrap gap-4">
                                {place.photos.length > 0 && (
                                    place.photos.map((photo, photoIndex) => (
                                        <img
                                            key={photoIndex}
                                            className="w-64 h-64 rounded-lg"
                                            src={`http://localhost:4000/uploads/${photo}`}
                                            alt=""
                                        />
                                    ))
                                )}
                            </div>
                            <p className="text-gray-600">{place.description}</p>
                            {/* <div className="flex justify-between items-center gap-2">
                                <Link to={`/account/places/${place._id}/edit`}>
                                    Edit
                                </Link>
                                <button
                                    onClick={() => {
                                        axios.delete(`/places/${place._id}`).then(() => {
                                            setPlaces(places.filter((p) => p._id !== place._id));
                                        });
                                    }}
                                    className="bg-red-400 text-white px-4 py-2 rounded-full"
                                >
                                    Delete
                                </button>
                            </div> */}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Places;
