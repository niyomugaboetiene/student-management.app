import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

const UpdateDepartment = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [building, setBuilding] = useState("");
    const [HOD, setHOD] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const { _id } = useParams();

    const [selectedTeacehr, setSelectedTeacher] = useState(null);

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const handleGetTeacher = async () => {
          try {
            setIsLoading(true);
            const trRes = await axios.get(`${BACKEND_URL}/teacher/teacher_list`, { withCredentials: true });
            console.log(trRes.data.teacher);
            setSelectedTeacher(trRes.data.teacher);
            setIsLoading(false);
          } catch (err) {
            console.error(err);
            setIsLoading(false);
          }
    }
    
    const GetExistingDepartment = async () => {
          try {
            setIsLoading(true);
            const trRes = await axios.get(`${BACKEND_URL}/teacher/${_id}`, { withCredentials: true });
            console.log(trRes.data.department);
            const values = trRes.data.department;
            setName(values.name)
            setIsLoading(false);
          } catch (err) {
            console.error(err);
            setIsLoading(false);
          }
    }

    useEffect(() => {
      GetExistingDepartment();
    }, [_id]);

    useEffect(() => {
        handleGetTeacher();
    }, []);

    const handleUpdateDepartment = async () => {
        try {
            setIsLoading(true);
            if (!name || !HOD) {
                setError("Fill out the missing fields");
                setMessage("");
            }
            const res = await axios.post(`${BACKEND_URL}/department/update/${_id}`, { name, description, building, HOD }, { withCredentials: true });
            setMessage(res.data.message);
            setIsLoading(false);
        } catch (err) {
            const errMessage = err.response?.data?.message || "Error occured"; 
            if (errMessage === "Please enter the real HOD id") {
                setError(errMessage);
                setMessage("");
            }

            if (errMessage === "Server error") {
                setError(errMessage);
                setMessage("");
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
                <h1 className="text-xl text-gray-600 font-bold">Add Department Portal</h1>

                <div className="mt-3">
                    <input type="text"  
                       onChange={(e) => setName(e.target.value)} required
                       className="bg-gray-100  w-full p-3 rounded-full focus:outline-1 focus:outline-gray-500" placeholder="Dep name"
                    />
                </div>
                
                <div className="mt-3">
                    <input type="text"  
                       onChange={(e) => setDescription(e.target.value)}
                       className="bg-gray-100  w-full p-3 rounded-full focus:outline-1 focus:outline-gray-500" placeholder="Description (Optional)"
                    />
                </div>
                
                <div className="mt-3">
                    <input type="text"  
                    onChange={(e) => setBuilding(e.target.value)} required
                    className="bg-gray-100 w-full p-3 rounded-full focus:outline-1 focus:outline-gray-500" placeholder="Building"
                />
                </div>
                
                <div className="mt-3 mb-4">
                    <select  
                       onChange={(e) => setHOD(e.target.value)} 
                       className="bg-gray-100 w-full rounded-full p-3 focus:outline-1 focus:outline-gray-500"
                    > 
                       {selectedTeacehr?.map((tr) => (
                        <option value={tr._id} key={tr._id}>{tr.full_name}</option>
                       ))}
                    </select>
                </div>

                <button onClick={handleUpdateDepartment} className="w-full bg-cyan-500 p-3 rounded-full text-white font-bold hover:bg-cyan-400 transition-colors mb-4">Update Department</button>

            </div>
        </div>
    )
}

export default UpdateDepartment;