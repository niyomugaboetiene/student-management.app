import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaBackward } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HandleGetStudentAttendance = () => {
    const [attendance, setAttendance] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate("");
    const [loading, setLoading] = useState(false);

    const  { _id }  = useParams();

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const handleGetAttendance = async() => {
        try {
            setLoading(true);
            console.log("Student id", _id)
            const res = await axios.get(`${BACKEND_URL}/attendance/stud/${_id}`, { withCredentials: true });
            setAttendance(res.data.attendance);
            console.log(res.data.attendance);
            setLoading(false);
        } catch (err) {
            console.error("Error", err);
            const errorMessage = err.response?.data?.message;
            if (errorMessage === "Enter a valid student id") {
                setError(errorMessage);
            }

            if (errorMessage === "Internal server error") {
                setError(errorMessage);
            }
            
            if (errorMessage === "NO attendance for this student") {
                setError(errorMessage);
            }

            setLoading(false);
        }
    }

    useEffect(() => {
        if (_id) {
           handleGetAttendance();
        }
    }, [_id]);


    return (
        <div className="min-h-screen p-3 bg-cyan-100">
            <h1 className="text-center mt-3 text-2xl text-cyan-500 font-bold">Student Attendance Report</h1>
            <div>
                <button className="flex gap-2 bg-cyan-300 p-2 rounded-lg text-white-700 hover:bg-cyan-400 transition-colors" onClick={() => navigate(-1)}><FaBackward /> Back</button>
            </div>
            <div className="flex space-x-6 mt-3">
                {attendance?.map((attend, index) => (
                    <div key={index} className="bg-white p-4 text-xl rounded-xl shadow-xl text-gray-700">
                        <h1>Attend Id: <span className="font-bold">{attend.attendance_id}</span></h1>
                        <h1>Stud Id: <span className="font-bold">{attend.student?.student_id}</span></h1>
                        <h1>Full_name: <span className="font-bold">{attend.student?.full_name}</span></h1>
                        <h1>Class_name: <span className="font-bold">{attend.class?.class_name ? attend.class?.class_name : "No class"}</span></h1>
                        <h1>Marked_by: <span className="font-bold">{attend.marked_by?.full_name}</span></h1>
                        <h1>Status: <span className={`text-white font-bold rounded-full ${attend.status === 'present' ? 'bg-green-400' : 'bg-red-400'} px-2 p-1 text-sm`}>{attend.status}</span></h1>
                        <h1>Attend Date: <span className="font-bold">{new Date(attend.date).toLocaleDateString()}</span></h1>
                        <h1>Done At: <span className="font-bold">{new Date(attend.createdAt).toLocaleDateString()}</span></h1>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HandleGetStudentAttendance