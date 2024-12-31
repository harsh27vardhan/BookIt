import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import Places from "./Places";
import AccountNav from "../components/AccountNav";

const ProfilePage = () => {
    const [redirect, setRedirect] = useState(null);
    const { ready, user, setUser } = useContext(UserContext);
    let { subpage } = useParams();
    if (subpage === undefined) {
        subpage = "profile";
    }

    async function logout() {
        await axios.post("/logout");
        setUser(null);
        setRedirect("/");
    }

    if (!ready) {
        return <div>Loading...</div>;
    }
    if (ready && !user && !redirect) {
        return <Navigate to={"/login"} />;
    }

    if (redirect) {
        return <Navigate to={redirect} />;
    }

    return (
        <div>
            <AccountNav />

            {subpage === "profile" && (
                <div className="max-w-xl mx-auto p-6 mt-8 bg-gray-100 shadow-md rounded-lg text-center">
                    <h2 className="text-2xl font-bold mb-4">User Profile</h2>
                    <div className="flex flex-col items-center">
                        <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-xl font-semibold mb-4">
                            {user.username[0].toUpperCase()}
                        </div>
                        <p className="text-lg font-semibold">
                            {user.username}
                        </p>
                        <p className="text-gray-600 mb-4">
                            {user.email}
                        </p>
                        {/* <div className="flex flex-col gap-3">
                            <p className="text-sm text-gray-500">Member since: {new Date(user.createdAt).toLocaleDateString()}</p>
                            <p className="text-sm text-gray-500">Last login: {new Date(user.lastLogin).toLocaleDateString()}</p>
                        </div> */}
                        <button
                            onClick={logout}
                            className="mt-6 bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}

            {subpage === "places" && <Places />}
        </div>

    );
};

export default ProfilePage;
