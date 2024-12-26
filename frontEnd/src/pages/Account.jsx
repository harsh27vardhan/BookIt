import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Places from './Places';

const Account = () => {
    const [redirect, setRedirect] = useState(null);
    const { ready, user, setUser } = useContext(UserContext);
    let { subpage } = useParams();
    if (subpage === undefined) {
        subpage = "profile";
    }

    async function logout() {
        await axios.post('/logout');
        setUser(null);
        setRedirect("/");
    }

    if (!ready) {
        return <div>Loading...</div>
    }
    if (ready && !user && !redirect) {
        return <Navigate to={"/login"} />
    }

    function linkClasses(type = null) {
        let classes = "py-2 px-6";
        if (type === subpage) {
            classes += "bg-primary text-black rounded-full";
        }
        return classes;
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div>
            <nav className="flex w-full justify-center mt-8 gap-2 mb-8">
                <Link className={linkClasses("profile")} to={"/account"}>My Profile</Link>
                <Link className={linkClasses("bookings")} to={"/account/bookings"}>My bookings</Link>
                <Link className={linkClasses("places")} to={"/account/places"}>My accomodations</Link>
            </nav>

            {subpage === "profile" && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.username} ({user.email})<br />
                    <button onClick={logout} className='primary max-w-sm mt-2'>Logout</button>
                </div>
            )}

            {subpage === "places" && (
                <Places />
            )}
        </div>
    )
}

export default Account
