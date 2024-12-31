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
        return classes + " account-nav py-2 px-4 flex items-center gap-1";
    }
    return (
        <nav className="account-nav-div flex w-full items-center justify-center mt-8 gap-4 mb-8 text-nowrap">
            <Link className={linkClasses("profile")} to={"/account"}>
                {subpage === "profile" ? <img className="h-4" src={profileImg} alt="" /> : null}
                My Profile
            </Link>
            <Link className={linkClasses("bookings")} to={"/account/bookings"}>
                {subpage === "bookings" ? <img className="h-4" src={bookingImg} alt="" /> : null}
                My bookings
            </Link>
            <Link className={linkClasses("places")} to={"/account/places"}>
                {subpage === "places" ? <img className="h-4" src={accomImg} alt="" /> : null}
                My accomodations
            </Link>
        </nav>
    )
}

export default AccountNav
