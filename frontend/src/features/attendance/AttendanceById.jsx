import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const HandleGetStudentAttendance = () => {
    const [attendance, setAttendance] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const  _id  = useParams();

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const handleGetAttendance = async() => {
        try {
            setLoading(true);
            console.log("Student id", _id)
            const res = await axios.get(`${BACKEND_URL}/attendance/stud/${_id}`, { withCredentials: true });
            setAttendance(res.data.attendance);
            setLoading(false);
        } catch (err) {
            console.error("Error", err);
            const errorMessage = err.response?.data?.message;
            if (errorMessage === "Enter a valid student id") {
                setError(errorMessage);
            }

            if (errorMessage === "Internal server error") {
                setError("Internal server error");
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
        <div>
            <div>
                {attendance?.map((attend, index) => (
                    <div>
                        <h1>{attend.attendance_id}</h1>
                        <h1>{attend.student?.full_name}</h1>
                        <h1>{attend.class?.class_name}</h1>
                        <h1>{attend.marked_by?.full_name}</h1>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HandleGetStudentAttendance