import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';

const AddMarks = () => {
    //  student, classes, subject, marks
    const [student, setStudent] = useState("");
    const [classes, setClasses] = useState("");
    const [subject, setSubject] = useState("");
    const [marks, setMarks] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const handleGetStudent = async () => {
          try {
            setIsLoading(true);
            const depRes = await axios.get(`${BACKEND_URL}/marks/add`, { withCredentials: true });
            console.log(depRes.data.department);
            setSelectedDepartment(depRes.data.department);
            setIsLoading(false);
          } catch (err) {
            console.error(err);
            setIsLoading(false);
          }
    }

    useEffect(() => {
        handleGetStudent();
    }, []);

    const handleAddMarks = async () => {
        try {
            setIsLoading(true);
            if (!student || !classes || !subject || !marks) {
                setError("Fill out the missing fields");
            }
            const res = await axios.post(`${BACKEND_URL}/marks/add`, { student, classes, subject, marks }, { withCredentials: true });
            setMessage(res.data.message);
            setIsLoading(false);
        } catch (err) {
            const errMessage = err.response?.data?.message || "Error occured"; 
            if (errMessage === "Unauthorized") {
                setError("Login to access this page");
            }

            if (errMessage === "YOu dont have access to this data") {
                setError(errMessage);
            }

            if (errMessage === "Internal server error") {
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
                <h1 className="text-xl text-gray-600 font-bold">Add Trade Portal</h1>

                <div className="mt-3">
                    <input type="text"  
                       onChange={(e) => setTrade_name(e.target.value)} required
                       className="bg-gray-100  w-full p-3 rounded-full focus:outline-1 focus:outline-gray-500" placeholder="Trade name"
                    />
                </div>
                
                <div className="mt-3">
                    <input type="text"  
                    onChange={(e) => setCode(e.target.value)} required
                    className="bg-gray-100 w-full p-3 rounded-full focus:outline-1 focus:outline-gray-500" placeholder="code"
                />
                </div>
                
                <div className="mt-3 mb-4">
                    <select  
                       onChange={(e) => setDepartment(e.target.value)} 
                       className="bg-gray-100 w-full rounded-full p-3 focus:outline-1 focus:outline-gray-500" placeholder=""
                    > 

                       {selectedDepartment?.map((dep) => (
                        <option value={dep._id} key={dep._id}>{dep.name}</option>
                       ))}
                    </select>
                </div>

                <button onClick={handleAddTrade} className="w-full bg-cyan-500 p-3 rounded-full text-white font-bold hover:bg-cyan-400 transition-colors mb-4">Add Trade</button>

            </div>
        </div>
    )
}

export default AddMarks;