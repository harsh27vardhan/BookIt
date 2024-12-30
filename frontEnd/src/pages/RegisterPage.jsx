import axios from 'axios';
import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }
    function registerUser(e) {
        e.preventDefault();
        try {
            axios.post("/register", formData);
            alert("Registration successful. Now you can log in.");
            <Navigate to={"/login"} />
        }
        catch (err) {
            alert("Registration failed. Please try again later.")
        }
    }
    return (
        <div className='mt-4 grow flex items-center justify-around gap-2'>
            <div className="-mt-32 flex flex-col gap-2">
                <h1 className="text-4xl text-center">
                    Register
                </h1>
                <form onSubmit={registerUser} className='max-w-md mx-auto'>
                    <input name='username' type="text" onChange={handleChange} placeholder='John Doe' />
                    <input name='email' type="email" onChange={handleChange} placeholder='your@email.com' />
                    <input name='password' type="password" onChange={handleChange} placeholder='password' />
                    <button type='submit' className='primary'>Register</button>
                    <div className='text-center text-gray-500 py-2'>Already a member? <Link className='underline text-black' to={"/login"}>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage
