import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const HandleGetStudentAttendance = () => {
    const [attendance, setAttendance] = useState([]);
    const [error, setError] = useState("");
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
                    <div key={index}>
                        <h1>Attend Id:{attend.attendance_id}</h1>
                        <h1>Stud Id:{attend.student?.student_id}</h1>
                        <h1>Full_name: {attend.student?.full_name}</h1>
                        <h1>Class_name: {attend.class?.class_name ? attend.class?.class_name : "No class"}</h1>
                        <h1>Marked_by: {attend.marked_by?.full_name}</h1>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HandleGetStudentAttendance