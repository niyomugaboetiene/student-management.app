import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';

const AddClass = () => {
    const [class_name, setClass_name] = useState("");
    const [code, setCode] = useState("");
    const [year, setYear] = useState("");
    const [teacher, setTeacher] = useState("");
    const [trade, setTrade] = useState("");
    const [createdBy, setCreatedBy] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [selectedTeacher, setSelectedTeaceher] = useState(null);
    const [selectedTrade, setSelectedTrade] = useState(null);
    // class_name, code, year, teacher, trade, createdBy

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const handleGetTeacher = async () => {
          try {
            setIsLoading(true);
            const trRes = await axios.get(`${BACKEND_URL}/teacher/teacher_list`, { withCredentials: true });
            console.log(trRes.data.teacher);
            setSelectedTeaceher(trRes.data.teacher);
            setIsLoading(false);
          } catch (err) {
            console.error(err);
            setIsLoading(false);
          }
    }

    useEffect(() => {
        handleGetTeacher();
    }, []);

        const handleGetTrade = async () => {
        try {
            setIsLoading(true);
            const tradeRes = await axios.get(`${BACKEND_URL}/student/auth/trade`);

            setSelectedTrade(tradeRes.data.trade);
            setIsLoading(false);
        } catch (err) {
            console.error(err);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        handleGetTrade();
    }, []);

    const handleAddClass = async () => {
        try {
            setIsLoading(true);
            if (!class_name || !year || !teacher || !trade) {
                setError("Fill out the missing fields");
                setMessage("");
                return;
            }
            const res = await axios.post(`${BACKEND_URL}/class/add`, { class_name, code, year, teacher, trade, createdBy }, { withCredentials: true });
            setMessage(res.data.message);
            setIsLoading(false);
        } catch (err) {
            const errMessage = err.response?.data?.message || "Error occured"; 
            if (errMessage === "Login first") {
                setError("Login to access this page");
            }

            if (errMessage === "YOu dont have access to this data") {
                setError(errMessage);
            }

            if (errMessage === "Server error") {
                setError(errMessage);
            }

            setIsLoading(false);
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
                <h1 className="text-xl text-gray-600 font-bold">Add Subject Portal</h1>

                <div className="mt-3">
                    <input type="text"  
                       onChange={(e) => setClass_name(e.target.value)} required
                       className="bg-gray-100  w-full p-3 rounded-full focus:outline-1 focus:outline-gray-500" placeholder="Class name"
                    />
                </div>
                
                <div className="mt-3">
                    <input type="text"  
                    onChange={(e) => setCode(e.target.value)} required
                    className="bg-gray-100 w-full p-3 rounded-full focus:outline-1 focus:outline-gray-500" placeholder="code"
                />
                </div>
                
                <div className="mt-3">
                    <input type="text"  
                    onChange={(e) => setYear(e.target.value)} required
                    className="bg-gray-100 w-full p-3 rounded-full focus:outline-1 focus:outline-gray-500" placeholder="Year"
                />
                </div>
                
                <div className="mt-3 mb-4">
                    <select  
                       onChange={(e) => setTeacher(e.target.value)} 
                       className="bg-gray-100 w-full rounded-full p-3 focus:outline-1 focus:outline-gray-500" placeholder=""
                    > 

                       <option value="" disabled>---Select class teacher---</option>
                       {selectedTeacher?.map((tr) => (
                        <option value={tr._id} key={tr._id}>{tr.full_name}</option>
                       ))}
                    </select>
                </div>
                
                <div className="mt-3 mb-4">
                    <select  
                       onChange={(e) => setTrade(e.target.value)} 
                       className="bg-gray-100 w-full rounded-full p-3 focus:outline-1 focus:outline-gray-500" placeholder=""
                    > 
                    <option value="" disabled>---Select trade---</option>

                       {selectedTrade?.map((tr) => (
                        <option value={tr._id} key={tr._id}>{tr.trade_name}</option>
                       ))}
                    </select>
                </div>

                <button onClick={handleAddClass} className="w-full bg-cyan-500 p-3 rounded-full text-white font-bold hover:bg-cyan-400 transition-colors mb-4">Add Class</button>

            </div>
        </div>
    )
}

export default AddClass;