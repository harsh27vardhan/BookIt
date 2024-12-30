import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
const IndexPage = () => {
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        axios.get("/places").then(res => {
            console.log(res);
            setPlaces(res.data);
        })
    }, [])
    return (
        <div className='mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
            {places.length > 0 && places.map(place => (
                <Link to={'/place/' + place._id} key={place._id}>
                    <div className='bg-gray-500 rounded-2xl mb-2 aspect-square'>
                        {place.photos?.[0] && (
                            <img src={"https://bookit-8xdu.onrender.com/uploads/" + place.photos?.[0]} alt="" className='rounded-2xl w-full h-full' />)}
                    </div>
                    <h2 className="text-sm truncate">
                        {place.title}
                    </h2>
                    <h3 className="font-bold">{place.address}</h3>
                    <div className='mt-2'>
                        <span className='font-bold'>₹ {place.price} per night</span>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default IndexPage
