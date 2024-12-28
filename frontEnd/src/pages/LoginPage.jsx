import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../UserContext';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const { setUser, setReady } = useContext(UserContext)

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }
    async function loginUser(e) {
        e.preventDefault();
        try {
            const { data } = await axios.post("/login", formData);
            // const response = await axios.get("/login");
            // console.log(response);
            setUser(data);
            alert("Login successful");
            setReady(true);
            navigate("/");
        }
        catch (error) {
            alert("Login failed");
        }
    }
    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className="-mt-32 flex flex-col gap-2">
                <h1 className="text-4xl text-center">
                    Login
                </h1>
                <form onSubmit={loginUser} className='max-w-md mx-auto'>
                    <input onChange={handleChange} name='email' type="email" placeholder='your@email.com' />
                    <input onChange={handleChange} name='password' type="password" placeholder='password' />
                    <button type='submit' className='primary'>Login</button>
                    <div className='text-center text-gray-500 py-2'>Don't have an account yet? <Link className='underline text-black' to={"/register"}>Register Now</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage
