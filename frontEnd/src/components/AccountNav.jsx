import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import profileImg from "../assets/images/profile.svg";
import bookingImg from "../assets/images/booking.svg";
import accomImg from "../assets/images/accomodation.svg";

const AccountNav = () => {
    const { pathname } = useLocation();
    let subpage = pathname.split('/')?.[2];
    if (subpage === undefined) {
        subpage = "profile";
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
    return (
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
    )
}

export default AccountNav
