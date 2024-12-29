import axios from 'axios';
import React, { useEffect, useState } from 'react'
import PhotoUploader from '../components/PhotoUploader';
import Perks from '../components/Perks';
import AccountNav from '../components/AccountNav';
import { Navigate, useParams } from 'react-router-dom';

const PlacesFormPage = () => {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState("");
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [maxGuests, setMaxGuests] = useState(1);
    const [redirect, setRedirect] = useState("");
    const [price, setPrice] = useState(100);

    useEffect(() => {
        if (!id) return;
        axios.get('/places/' + id).then(response => {
            const { data } = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        })
    }, [id])

    async function savePlace(e) {
        e.preventDefault();
        const placeData = { title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price };
        if (id) {
            //update
            await axios.put("/places", { id, ...placeData });
            setRedirect(true);
        }
        else {
            //new place
            await axios.post("/places", placeData);
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={"/account/places"} />
    }

    return (
        <div>
            <AccountNav />

            <form onSubmit={savePlace}>
                <h2 className="text-2xl mt-4">Title</h2>
                <p className="text-gray-500 text-sm">
                    Title for you place. It should be short and eye catchy for the
                    advertisement.
                </p>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    placeholder="title, for example: My apt."
                />
                <h2 className="text-2xl mt-4">Address</h2>
                <p className="text-gray-500 text-sm">Address to this place.</p>
                <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    type="text"
                    placeholder="address"
                />
                <h2 className="text-2xl mt-4">Photos</h2>
                <p className="text-gray-500 text-sm">more photos = better</p>
                <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                <h2 className="text-2xl mt-4">Description</h2>
                <p className="text-gray-500 text-sm">description of the place</p>
                <textarea
                    placeholder="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <h2 className="text-2xl mt-4">Perks</h2>
                <p className="text-gray-500 text-sm">
                    select all the perks of your place
                </p>
                <Perks selected={perks} onChange={setPerks} />
                <h2 className="text-2xl mt-4">Extra info</h2>
                <p className="text-gray-500 text-sm">house rules, etc.</p>
                <textarea
                    value={extraInfo}
                    onChange={(e) => setExtraInfo(e.target.value)}
                />
                <h2 className="text-2xl mt-4">Check in & out times</h2>
                <p className="text-gray-500 text-sm">
                    add check in and out times, remember to have some time for cleaning
                    the room between guests
                </p>
                <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
                    <div>
                        <h3 className="mt-2 -mb-1">Check in time</h3>
                        <input
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            type="text"
                            placeholder="11:00"
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Check out time</h3>
                        <input
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            type="text"
                            placeholder="14:00"
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Max number of guests</h3>
                        <input
                            value={maxGuests}
                            onChange={(e) => setMaxGuests(e.target.value)}
                            type="number"
                            placeholder="12"
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Price per night</h3>
                        <input
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            type="number"
                            placeholder="12"
                        />
                    </div>
                </div>
                <button type="submit" className="primary my-4">Save</button>
            </form>
        </div>
    )
}

export default PlacesFormPage
