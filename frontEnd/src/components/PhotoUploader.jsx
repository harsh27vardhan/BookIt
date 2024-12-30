import React, { useState } from 'react'
import uploadImg from "../assets/images/upload.svg";
import axios from 'axios';

const PhotoUploader = ({ addedPhotos, onChange }) => {
    const [photoLink, setPhotoLink] = useState('');
    async function addPhotoByLink(e) {
        e.preventDefault();
        try {
            const { data } = await axios.post("/upload-by-link", { link: photoLink });
            onChange(prev => {
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
            onChange(prev => {
                return [...prev, ...data]
            });
        });
    }
    return (
        <>
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
                        <img className="rounded-2xl w-full object-cover" src={`https://bookit-8xdu.onrender.com/uploads/${link}`} alt="" />
                    </div>
                ))}
                <label className="flex justify-center items-center border bg-transparent rounded-2xl h-32 cursor-pointer p-2 text-2xl text-gray-600">
                    <input multiple type="file" className="hidden" onChange={uploadPhoto} />
                    <img className="h-8" src={uploadImg} alt="" />
                    Upload
                </label>
            </div></>
    )
}

export default PhotoUploader
