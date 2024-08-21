import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Signup({ onSignup }) {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('');

    const backendUrl = 'https://bartender-cheatsheet.onrender.com';

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${backendUrl}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                onSignup(username);
                navigate('/')
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
            setMessage('An error occurred. Please try again.');
        }
    }

    return (
        <form onSubmit={handleSignup} className="w-11/12 sm:w-4/5 md:w-fit flex flex-col mx-auto md:mt-16 p-5 bg-white/75 shadow-xl gap-5 border-2 rounded-2xl border-white">
            <h2 className="font-semibold text-3xl">Sign up</h2>
            <div className="relative">
                <label className="block text-gray-700 text-sm font-bold mb-1 text-left pl-3" htmlFor="username">
                    Username
                </label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="off"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full md:w-96 bg-white py-3 px-6 pr-12 rounded-full outline-none shadow-lg text-sm"
                    placeholder="Username"
                />
                <svg className="absolute top-9 right-5 opacity-60" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/></svg>
            </div>
            <div className="relative">
                <label className="block text-gray-700 text-sm font-bold mb-1 text-left pl-3" htmlFor="email">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full md:w-96 bg-white py-3 px-6 pr-12 rounded-full outline-none shadow-lg text-sm"
                    placeholder="Email"
                />
                <svg className="absolute top-9 right-5 opacity-60" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z"/></svg>
            </div>
            <div className="relative">
                <label className="block text-gray-700 text-sm font-bold mb-1 text-left pl-3" htmlFor="password">
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full md:w-96 bg-white py-3 px-6 pr-12 rounded-full outline-none shadow-lg text-sm"
                    placeholder="Password"
                />
                <svg className="absolute top-9 right-5 opacity-60" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/></svg>
            </div>
            <button type="submit" className='text-base py-2 px-4 rounded-lg uppercase font-semibold tracking-wider inline-block shadow-md bg-black/90 text-white'>Signup</button>
            <p className="text-sm">Alredy have an account? <Link className="underline" to={'/login'}>Login</Link></p>
            {message && <p className="text-rose-600">{message}</p>}
        </form>
    )
}
