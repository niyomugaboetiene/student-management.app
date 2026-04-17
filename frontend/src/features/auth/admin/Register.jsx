import React from "react";
import { useState } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom"; 


const AdminRegister = () => {
    const [full_name, setFull_name] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [location, setLocation] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    // full_name, email, phone, location, password 

    const handleRegisterUser = async () => {
        try {
            // console.log("Received data", full_name, phone, password);
            if (!full_name || !phone || !password) {
                setMessage("");
                setError("Fill out some missing fields");
                return;
            }
            setLoading(true);
            const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
            const res = await axios.post(`${BACKEND_URL}/admin/auth/register`, {
                full_name,
                email,
                phone,
                location,
                password
            }, { withCredentials: true });
 
          setLoading(false);
          setMessage(res.data.message);
          setError("");
        } catch (err) {
            setMessage("");
            setLoading(false);
            const errorMessage = err.response?.data?.message || "Error occured";

            if (errorMessage === "Try to fill out valid credentials") {
               setMessage("");
               setError(errorMessage);
               console.message(errorMessage);
          }
          if (errorMessage === "Incorrect password") {
               setMessage("");
               setError(errorMessage); 
          }

           setError(errorMessage);
        }
    }


    return (
        <div className="bg-gray-100 min-h-screen flex justify-center items-center p-3">
            <div className="bg-white w-110 rounded-xl p-4 shadow-lg">
                {message  && (
                    <div className="bg-green-500 mb-2 p-2 rounded-lg text-white font-bold relative flex justify-between">
                        <p>{message}</p> <p className="text-lg mt-1" onClick={() => setMessage("")}><FaTimes /></p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-500 mb-2 p-2 rounded-lg text-white font-bold relative flex justify-between">
                        <p>{error}</p> <p className="text-lg mt-1" onClick={() => setError("")}><FaTimes /></p>
                    </div>                )}
                <h1 className="text-xl text-gray-600 font-bold">Login Admin Portal</h1>

                <div className="mt-3">
                    <input type="text"  
                       onChange={(e) => setFull_name(e.target.value)} required
                       className="bg-gray-100  w-full p-3 rounded-full focus:outline-1 focus:outline-gray-500" placeholder="Full name"
                    />
                </div>
                
                <div className="mt-3">
                    <input type="text"  
                    onChange={(e) => setPhone(e.target.value)} required
                    className="bg-gray-100 w-full p-3 rounded-full focus:outline-1 focus:outline-gray-500" placeholder="Phone"
                />
                </div>
                
                <div className="mt-3 mb-4">
                    <input type="password"  
                       onChange={(e) => setPassword(e.target.value)} required
                       className="bg-gray-100 w-full rounded-full p-3 focus:outline-1 focus:outline-gray-500" placeholder="Password"
                    />
                </div>

                <button onClick={handleRegisterUser} className="w-full bg-cyan-500 p-3 rounded-full text-white font-bold hover:bg-cyan-400 transition-colors mb-4">Login</button>
                <hr />

                <Link className="flex items-center justify-center mt-2 text-cyan-500 hover:underline">Create account</Link>
            </div>
        </div>
    )
}

export default AdminRegister