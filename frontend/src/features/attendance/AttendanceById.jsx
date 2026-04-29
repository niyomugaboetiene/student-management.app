import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const HandleGetStudentAttendance = () => {
    const [attendance, setAttendance] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { student_id } = useParams();

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const handleGetAttendance = async() => {
        try {
            setLoading(true);
            const res = await axios.get(`${BACKEND_URL}/attendance/stud/${student_id}`, { withCredentials: true });
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
        handleGetAttendance();
    }, []);


    return (
        <div>
            <div>
                {}
            </div>
        </div>
    )
}