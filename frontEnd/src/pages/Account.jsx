import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import Places from "./Places";
import profileImg from "../assets/images/profile.svg";
import bookingImg from "../assets/images/booking.svg";
import accomImg from "../assets/images/accomodation.svg";

const Account = () => {
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

    function linkClasses(type = null) {
        let classes = "";
        if (type === subpage) {
            classes += " bg-primary text-white rounded-full";
        }
        else {
            classes += " bg-gray-200 rounded-full";
        }
        return classes + " py-2 px-4 flex items-center gap-1";
    }

    if (redirect) {
        return <Navigate to={redirect} />;
    }

    return (
        <div>
            <nav className="flex w-full items-center justify-center mt-8 gap-4 mb-8">
                <Link className={linkClasses("profile")} to={"/account"}>
                    <img className="h-4" src={profileImg} alt="" />
                    My Profile
                </Link>
                <Link className={linkClasses("bookings")} to={"/account/bookings"}>
                    <img className="h-4" src={bookingImg} alt="" />
                    My bookings
                </Link>
                <Link className={linkClasses("places")} to={"/account/places"}>
                    <img className="h-4" src={accomImg} alt="" />
                    My accomodations
                </Link>
            </nav>

            {subpage === "profile" && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.username} ({user.email})<br />
                    <button onClick={logout} className="primary max-w-sm mt-2">
                        Logout
                    </button>
                </div>
            )}

            {subpage === "places" && <Places />}
        </div>
    );
};

export default Account;
