import React from "react";
import { useState } from "react";
import axios from "axios";


const AdminLogin = () => {
    const [full_name, setFull_name] = useState("");
    const [phone, setPhone] = useState("");
    const [passsword, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLoginUser = async () => {
        try {
            setLoading(true);
            const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
            const res = await axios.post(`${BACKEND_URL}/admin/auth/login`, {
                full_name,
                phone,
                passsword
            }, { withCredentials: true });
 
          setLoading(false);
          setMessage(res.data.message);
        } catch (err) {
            setLoading(false);
            console.error(err);
            const errorMessage = err?.response.error;
            setError(errorMessage);
        }
    }


    return (
        <div>
            <div>

                {message && (
                    <p>{message}</p>
                )}

                {error && (
                    <p>{error}</p>
                )}
                <h1>Login Admin Portal</h1>

                <div>
                    <label htmlFor="">Full name</label>
                    <input type="text"  onChange={(e) => setFull_name(e.target.value)}/>
                </div>
                
                <div>
                    <label htmlFor="">Phone</label>
                    <input type="text"  onChange={(e) => setPhone(e.target.value)}/>
                </div>
                
                <div>
                    <label htmlFor="">Password</label>
                    <input type="password"  onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <button onClick={handleLoginUser}>Login</button>
            </div>
        </div>
    )
}

export default AdminLogin