import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UpdateClass = () => {

    const { _id } = useParams();
    const [class_name, setClass_name] = useState("");
    const [code, setCode] = useState("");
    const [year, setYear] = useState("");
    const [teacher, setTeacher] = useState("");
    const [trade, setTrade] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const [selectedTeacher, setSelectedTeaceher] = useState(null);
    const [selectedTrade, setSelectedTrade] = useState(null);

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


        const handleGetClass = async () => {
          try {
            setIsLoading(true);
            const classRes = await axios.get(`${BACKEND_URL}/class/get/${_id}`, { withCredentials: true });
            const classData = classRes.data.classes;

            // console.log("Data", classRes.subject?.subject_name);
            // student, classes, subject, marks
            setClass_name(classData.class_name || "");
            setCode(classData.code || "");
            setYear(classData.year || "");
            setTeacher(classData.teacher?._id || "");
            setTrade(classData.trade?._id || "");
            setIsLoading(false);
          } catch (err) {
            console.error(err);
            setIsLoading(false);
          }
    }

    useEffect(() => {
        handleGetClass();
    }, [_id]);

    const handleUpdateCLass = async () => {
        try {
            setIsLoading(true);
            // console.log("Received data", student, classes, subject, marks);
            const res = await axios.put(`${BACKEND_URL}/class/update/${_id}`, { class_name, code, year, teacher, trade }, { withCredentials: true });
            setMessage(res.data.message);
            navigate('/class/list');
           setIsLoading(false);
        } catch (err) {
            const errMessage = err.response?.data?.message || "Error occured"; 
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
                    </div>
                )}
               {isLoading && (
                    <div className="flex justify-center items-center">
                        <div className="h-8 w-8 text-cyan-500 border-transparent animate-spin"></div>
                    </div>
                )}
               
                <h1 className="text-xl text-gray-600 font-bold">Update Class Portal</h1>
              
                <div className="mt-3">
                    <input type="text"  
                       value={class_name}
                       onChange={(e) => setClass_name(e.target.value)} required
                       className="bg-gray-100  w-full p-3 rounded-full focus:outline-1 focus:outline-gray-500" placeholder="Class name"
                    />
                </div>
                
                <div className="mt-3">
                    <input type="text"  
                    value={code}
                    onChange={(e) => setCode(e.target.value)} required
                    className="bg-gray-100 w-full p-3 rounded-full focus:outline-1 focus:outline-gray-500" placeholder="code"
                />
                </div>
                
                <div className="mt-3">
                    <input type="text"
                    value={year}  
                    onChange={(e) => setYear(e.target.value)} required
                    className="bg-gray-100 w-full p-3 rounded-full focus:outline-1 focus:outline-gray-500" placeholder="Year"
                />
                </div>

                <div className="mt-3 mb-4">
                    <select  
                       value={teacher}
                       onChange={(e) => setTeacher(e.target.value)} 
                       className="bg-gray-100 w-full rounded-full p-3 focus:outline-1 focus:outline-gray-500"
                    > 

                       {selectedTeacher?.map((teacher) => (
                        <option value={teacher._id} key={teacher._id}>{teacher.full_name}</option>
                       ))}
                    </select>
                </div>

                <div className="mt-3 mb-4">
                    <select  
                        value={trade}
                       onChange={(e) => setTrade(e.target.value)} 
                       className="bg-gray-100 w-full rounded-full p-3 focus:outline-1 focus:outline-gray-500"
                    > 

                       {selectedTrade?.map((tr) => (
                        <option value={tr._id} key={tr._id}>{tr.trade_name}</option>
                       ))}
                    </select>
                </div>
                
                <button onClick={handleUpdateCLass} className="w-full bg-cyan-500 p-3 rounded-full text-white font-bold hover:bg-cyan-400 transition-colors mb-4">Update Marks</button>

            </div>
        </div>
    )
}

export default UpdateClass;