import React, { useContext } from 'react'
import logoImg from "./assets/images/logo.svg"
import searchImg from "./assets/images/search.svg"
import hambImg from "./assets/images/hamb.svg"
import userImg from "./assets/images/user.svg"
import { Link } from 'react-router-dom'
import { UserContext } from './UserContext'

const Header = () => {
    const { user } = useContext(UserContext);
    return (
        <header className='flex justify-between'>
            <Link to={"/"} className='flex items-center gap-1'>
                <img src={logoImg} alt="" className='logo w-8 h-6' />
                <span className='font-bold'>RentItUp</span>
            </Link>

            <div className='flex items-center border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300 gap-2'>
                <div>Anywhere</div>
                <div className="border border-l border-grey-300 h-full"></div>
                <div>Any week</div>
                <div className="border border-l border-grey-300 h-full"></div>
                <div>Add guests</div>
                <button className='bg-primary text-white p-2 rounded-full'>
                    <img src={searchImg} alt="" className='w-4 h-4' />
                </button>
            </div>

            <Link to={user ? '/account' : '/login'} className='flex items-center border border-gray-300 rounded-full py-2 px-4 gap-2'>
                <img src={hambImg} alt="" className='w-6 h-6' />
                <img src={userImg} alt="" className='w-6 h-6 border border-l rounded-full bg-gray-200' />
                {user && (<div>{user.username}</div>)}
            </Link>
        </header>
    )
}

export default Header
