import React from "react";
import { useState } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; 


const AdminRegister = () => {
    const [full_name, setFull_name] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [location, setLocation] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    // full_name, email, phone, location, password 

    const handleRegisterUser = async () => {
        try {
            // console.log("Received data", full_name, phone, password);
            if (!full_name || !phone || !password || !phone || !location) {
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
          navigate('/admin/login');
        } catch (err) {
            setLoading(false);
            const errorMessage = err.response?.data?.message || "Error occured";

            if (errorMessage === "Email must be unique") {
               setMessage("");
               setError(errorMessage);
               console.log(errorMessage);
          }
          if (errorMessage === "Phone must be unique") {
               setMessage("");
               setError(errorMessage); 
          }

           setError(errorMessage);
           setMessage("");
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
                    </div>       
                 )}

                {loading && (
                    <div className="flex justify-center items-center">
                        <div className="h-8 w-8 text-cyan-500 border-transparent animate-spin"></div>
                    </div>
                )}
                <h1 className="text-xl text-gray-600 font-bold">Register Admin Portal</h1>

                <div className="mt-3">
                    <input type="text"  
                       onChange={(e) => setFull_name(e.target.value)} required
                       className="bg-gray-100  w-full p-3 rounded-full focus:outline-1 focus:outline-gray-500" placeholder="Full name"
                    />
                </div>
                
                <div className="mt-3">
                    <input type="text"  
                       onChange={(e) => setLocation(e.target.value)} required
                       className="bg-gray-100  w-full p-3 rounded-full focus:outline-1 focus:outline-gray-500" placeholder="District"
                    />
                </div>
                
                <div className="mt-3">
                    <input type="text"  
                       onChange={(e) => setEmail(e.target.value)} required
                       className="bg-gray-100  w-full p-3 rounded-full focus:outline-1 focus:outline-gray-500" placeholder="Email"
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

                <button onClick={handleRegisterUser} className="w-full bg-cyan-500 p-3 rounded-full text-white font-bold hover:bg-cyan-400 transition-colors mb-4">Create account</button>
                <hr />

                <Link className="flex items-center justify-center mt-2 text-cyan-500 hover:underline" to='/admin/login'>login</Link>
            </div>
        </div>
    )
}

export default AdminRegister