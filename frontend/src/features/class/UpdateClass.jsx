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

    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedClass, setSelectedClass] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(null);

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

    const handleGetSubject = async () => {
          try {
            setIsLoading(true);
            const subRes = await axios.get(`${BACKEND_URL}/subjects/class/${classes}`, { withCredentials: true });
            // console.log("List of subject", subRes.data.subject);
            setSelectedSubject(subRes.data.subject);
            setIsLoading(false);
          } catch (err) {
            console.error(err);
            setIsLoading(false);
          }
    }
    
    useEffect(() => {
        if (classes) {
            handleGetSubject();
        }
    }, [classes])


    useEffect(() => {
        handleGetStudent();
    }, []);

        const handleGetMarks = async () => {
          try {
            setIsLoading(true);
            const marksRes = await axios.get(`${BACKEND_URL}/marks/${_id}`, { withCredentials: true });
            const marksData = marksRes.data.marks;

            console.log("Data", marksData.subject?.subject_name);
            // student, classes, subject, marks
            setStudent(marksData.student?._id || "");
            setClasses(marksData.class?._id || "");
            setSubject(marksData.subject?._id || "");
            setMarks(marksData.marks || "");
            setIsLoading(false);
          } catch (err) {
            console.error(err);
            setIsLoading(false);
          }
    }

    useEffect(() => {
        handleGetMarks();
    }, [_id]);

    const handleUpdateMarks = async () => {
        try {
            setIsLoading(true);
            // console.log("Received data", student, classes, subject, marks);
            const res = await axios.put(`${BACKEND_URL}/marks/update/${_id}`, { student, classes, subject, marks }, { withCredentials: true });
            setMessage(res.data.message);
            setIsLoading(false);
            navigate('/marks/list');
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
                    </div>                )}
                <h1 className="text-xl text-gray-600 font-bold">Update Marks Portal</h1>
                
                <div className="mt-3 mb-4">
                    <select  
                        value={student}
                       onChange={(e) => setStudent(e.target.value)} 
                       className="bg-gray-100 w-full rounded-full p-3 focus:outline-1 focus:outline-gray-500"
                    > 

                       {selectedStudent?.map((st) => (
                        <option value={st._id} key={st._id}>{st.full_name}</option>
                       ))}
                    </select>
                </div>
                
                <div className="mt-3 mb-4">
                    <select  
                       value={classes}
                       onChange={(e) => setClasses(e.target.value)} 
                       className="bg-gray-100 w-full rounded-full p-3 focus:outline-1 focus:outline-gray-500"
                    > 

                       {selectedClass?.map((classe) => (
                        <option value={classe._id} key={classe._id}>{classe.class_name}</option>
                       ))}
                    </select>
                </div>
                
                <div className="mt-3 mb-4">
                    <select  
                       value={subject}
                       onChange={(e) => setSubject(e.target.value)} 
                       className="bg-gray-100 w-full rounded-full p-3 focus:outline-1 focus:outline-gray-500"
                    > 

                       {selectedSubject?.map((sub) => (
                        <option value={sub._id} key={sub._id}>{sub.subject_name}</option>
                       ))}
                    </select>
                </div>
                                
                <div className="mt-3">
                    <input type="number"  
                    value={marks}
                    onChange={(e) => setMarks(e.target.value)} required
                    className="bg-gray-100 w-full p-3 rounded-full mb-5 focus:outline-1 focus:outline-gray-500" placeholder="Marks"
                />
                </div>

                <button onClick={handleUpdateMarks} className="w-full bg-cyan-500 p-3 rounded-full text-white font-bold hover:bg-cyan-400 transition-colors mb-4">Update Marks</button>

            </div>
        </div>
    )
}

export default UpdateMarks;