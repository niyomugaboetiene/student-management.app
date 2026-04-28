import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';

const AddAttendance = () => {
    // student, classe, marked_by, date, status
    const [student, setStudent] = useState("");
    const [classe, setClasse] = useState("");
    const [marked_by, setMarked_by] = useState("");
    const [date, setDate] = useState("");
    const [status, setStatus] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [selectedClasse, setSelectedClasse] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedMarked_By, setSelectedMarked_by] = useState(null);

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    let class_id;

    const handleGetClasse = async () => {
          try {
            setIsLoading(true);
            const classRes = await axios.get(`${BACKEND_URL}/class/class_list`, { withCredentials: true });            
            setSelectedClasse(classRes.data.classes);
            setIsLoading(false);
          } catch (err) {
            console.error(err);
            setIsLoading(false);
          }
    }

    useEffect(() => {
        handleGetClasse();
    }, []);
    
    const handleGetStudent = async () => {
          try {
            setIsLoading(true);
            const studentRes = await axios.get(`${BACKEND_URL}/student/class/${classe}`, { withCredentials: true });
            console.log("Class id", classe)
            console.log("Result", studentRes.data.student);
            setSelectedStudent(studentRes.data.student);
            setIsLoading(false);
          } catch (err) {
            console.error(err);
            setIsLoading(false);
          }
    }

    useEffect(() => {
        if (classe) {
            handleGetStudent();
        }
    }, [classe]);
    
    const handleGetMarkedBy = async () => {
          try {
            setIsLoading(true);
            const classRes = await axios.get(`${BACKEND_URL}/teacher/teacher_list`, { withCredentials: true });
            console.log(classRes.data.teacher);
            setSelectedMarked_by(classRes.data.teacher);
            setIsLoading(false);
          } catch (err) {
            console.error(err);
            setIsLoading(false);
          }
    }

    useEffect(() => {
        handleGetMarkedBy();
    }, []);

    const handleAddAttendance = async () => {
        try {
            setIsLoading(true);
            if (!student || !classe || !marked_by || !status || !date) {
                setError("Fill out the missing fields");
            }
            const res = await axios.post(`${BACKEND_URL}/attendance/attendance`, { student, classe, marked_by, date, status }, { withCredentials: true });
            setMessage(res.data.message);
            setIsLoading(false);
        } catch (err) {
            const errMessage = err.response?.data?.message || "Error occured"; 
            // if (errMessage === "Unauthorized") {
            //     setError("Login to access this page");
            // }

            // if (errMessage === "YOu dont have access to this data") {
            //     setError(errMessage);
            // }

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
                <h1 className="text-xl text-gray-600 font-bold">Add Attendance Portal</h1>
             
                <div className="mt-3 mb-4">
                    <select  
                       onChange={(e) => setClasse(e.target.value)} 
                       className="bg-gray-100 w-full rounded-full p-3 focus:outline-1 focus:outline-gray-500" placeholder=""
                    > 

                       {selectedClasse?.map((cla) => (
                        <option value={cla._id} key={cla._id}>{cla.class_name}</option>
                       ))}
                    </select>
                </div>
                
                <div className="mt-3 mb-4">
                    <select  
                       onChange={(e) => setStudent(e.target.value)} 
                       className="bg-gray-100 w-full rounded-full p-3 focus:outline-1 focus:outline-gray-500" placeholder=""
                    > 

                       {selectedStudent?.map((st) => (
                        <option value={st._id} key={st._id}>{st.full_name}</option>
                       ))}
                    </select>
                </div>
                
                <div className="mt-3 mb-4">
                    <select  
                       onChange={(e) => setMarked_by(e.target.value)} 
                       className="bg-gray-100 w-full rounded-full p-3 focus:outline-1 focus:outline-gray-500" placeholder=""
                    > 

                       {selectedMarked_By?.map((tr) => (
                        <option value={tr._id} key={tr._id}>{tr.full_name}</option>
                       ))}
                    </select>
                </div>

                <div className="mt-3">
                    <input type="date"  
                       onChange={(e) => setDate(e.target.value)} required
                       className="bg-gray-100  w-full p-3 rounded-full focus:outline-1 focus:outline-gray-500"
                    />
                </div>
                
                <div className="mt-3">
                    <select 
                        className="bg-gray-100  w-full p-3 rounded-full focus:outline-1 focus:outline-gray-500"
                        onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="">Select status</option>
                            <option value="present">Present</option>
                            <option value="absent">Absent</option>
                        </select>
                </div>

                <button onClick={handleAddAttendance} className="w-full bg-cyan-500 p-3 rounded-full text-white font-bold hover:bg-cyan-400 transition-colors mb-4">Add Attendance</button>

            </div>
        </div>
    )
}

export default AddAttendance;