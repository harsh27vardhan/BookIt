import React, { useState } from "react";
import uploadImg from "../assets/images/upload.svg";
import axios from "axios";

const PhotoUploader = ({ addedPhotos, onChange }) => {
    const [photoLink, setPhotoLink] = useState("");
    function addPhotoByLink(e) {
        e.preventDefault();
        try {
            // const { data } = await axios.post("/upload-by-link", { link: photoLink });
            onChange((prev) => {
                return [...prev, photoLink];
            });
            setPhotoLink("");
        } catch (err) {
            console.error("Error uploading photo: " + err);
        }
    }
    function uploadPhoto(e) {
        const files = e.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append("file", files[i]); // appends all the files sent from the front end in a single array of images.
        }
        // axios.post("/upload", data, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     }
        // }).then(response => {
        //     let { data } = response;
        //     data = data.map(item => item.split("uploads")[1])
        //     console.log(data);
        //     onChange(prev => {
        //         return [...prev, ...data]
        //     });
        // });


        // data.append("file", files[0]);
        data.append("upload_preset", "rentitup");
        data.append("cloud_name", "dpr4rgsgb");
        fetch("https://api.cloudinary.com/v1_1/dpr4rgsgb/image/upload", {
            method: "POST",
            body: data,
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Error: ${res.status} ${res.statusText}`);
                }
                return res.json();
            })
            .then((data) => {
                const transformedUrl = data.secure_url.replace(
                    "/upload/",
                    "/upload/q_auto,f_auto,w_300,h_300,c_fill/"
                );

                console.log("Transformed URL: ", transformedUrl);
                onChange((prev) => {
                    return [...prev, transformedUrl];
                })
            })
            .catch((err) => {
                console.error("Error uploading photo: ", err);
                alert("Failed to upload photo");
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
                <button
                    onClick={addPhotoByLink}
                    className="bg-gray-200 px-4 rounded-2xl"
                >
                    Add&nbsp;photo
                </button>
            </div>
            <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 items-center gap-2">
                {addedPhotos.length > 0 &&
                    addedPhotos.map((link, index) => (
                        <div key={index} className="h-32 flex">
                            <img
                                className="rounded-2xl w-full object-cover"
                                src={link}
                                alt=""
                            />
                        </div>
                    ))}
                <label className="flex justify-center items-center border bg-transparent rounded-2xl h-32 cursor-pointer p-2 text-2xl text-gray-600">
                    <input
                        multiple
                        className="hidden"
                        type="file"
                        onChange={uploadPhoto}
                        accept="image/*"
                    />
                    <img className="h-8" src={uploadImg} alt="" />
                </label>
            </div>
        </>
    );
};

export default PhotoUploader;
