import React from "react";
import { useState } from "react";
import axios from "axios";


const AdminLogin = () => {
    const [full_name, setFull_name] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLoginUser = async () => {
        try {
            // console.log("Received data", full_name, phone, password);
            if (!full_name || !phone || !password) {
                setMessage("Fill out some missing fields");
                return;
            }
            setLoading(true);
            const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
            const res = await axios.post(`${BACKEND_URL}/admin/auth/login`, {
                full_name,
                phone,
                password
            }, { withCredentials: true });
 
          setLoading(false);
          setMessage(res.data.message);
        } catch (err) {
            setLoading(false);
            console.error(err);
            const errorMessage = err.response?.data?.error;
            setError(errorMessage);
        }
    }


    return (
        <div className="bg-gray-100 min-h-screen flex justify-center items-center p-3">
            <div className="bg-white w-110 rounded-xl p-4 ">
                {message && (
                    <div className="bg-red-500 mb-2 p-2 rounded-lg text-white font-bold">
                        <p>{message}</p>
                    </div>
                )}

                {error && (
                    <div><p>{error}</p></div>
                )}
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

                <button onClick={handleLoginUser} className="w-full bg-cyan-500 p-3 rounded-full text-white font-bold hover:bg-cyan-400 transition-colors">Login</button>
            </div>
        </div>
    )
}

export default AdminLogin