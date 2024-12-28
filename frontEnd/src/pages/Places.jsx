import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import plusImg from "../assets/images/plus.svg";
import uploadImg from "../assets/images/upload.svg";
import Perks from "../extra/Perks";
import axios from "axios";

const Places = () => {
    const { action } = useParams();
    // console.log(action);
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState("");
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState("");
    const [photoLink, setPhotoLink] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState(100);
    const [redirect, setRedirect] = useState(false);

    async function addPhotoByLink(e) {
        e.preventDefault();
        try {
            const { data } = await axios.post("/upload-by-link", { link: photoLink });
            setAddedPhotos(prev => {
                return [...prev, data]
            });
            setPhotoLink("");
        }
        catch (err) {
            console.error('Error uploading photo: ' + err);
        }
    }
    function uploadPhoto(e) {
        const files = e.target.files;
        console.log(files);
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]); // appends all the files sent from the front end in a single array of images.
        }
        axios.post("/upload", data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            let { data } = response;
            data = data.map(item => item.split("uploads")[1])
            console.log(data);
            setAddedPhotos(prev => {
                return [...prev, ...data]
            });
        });
    }

    return (
        <div>
            {action !== "new" && (
                <div className="text-center">
                    <Link
                        className="inline-flex gap-1 bg-primary items-center text-white py-2 px-4 rounded-full"
                        to={"/account/places/new"}
                    >
                        <img className="h-6" src={plusImg} alt="" />
                        Add new location
                    </Link>
                </div>
            )}
            {action === "new" && (
                <form>
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
                    <div className="flex gap-2">
                        <input
                            value={photoLink}
                            onChange={(e) => setPhotoLink(e.target.value)}
                            type="text"
                            placeholder="add using link ....jpg"
                        />
                        <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">
                            Add&nbsp;photo
                        </button>
                    </div>
                    <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 items-center gap-2">
                        {addedPhotos.length > 0 && addedPhotos.map((link, index) => (
                            <div key={index} className="h-32 flex">
                                <img className="rounded-2xl w-full object-cover" src={`http://localhost:4000/uploads/${link}`} alt="" />
                            </div>
                        ))}
                        <label className="flex justify-center items-center border bg-transparent rounded-2xl h-32 cursor-pointer p-2 text-2xl text-gray-600">
                            <input multiple type="file" className="hidden" onChange={uploadPhoto} />
                            <img className="h-8" src={uploadImg} alt="" />
                            Upload
                        </label>
                    </div>
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
                    <div className="grid gap-2 sm:grid-cols-3">
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
                    </div>
                    <button className="primary my-4">Save</button>
                </form>
            )}
        </div>
    );
};

export default Places;
