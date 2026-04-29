import { useEffect, useState } from "react";

const HandleGetStudentAttendance = () => {
    const [attendance, setAttendance] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const handleGetAttendance = async() => {
        try {
            setLoading(true);
            const res = await axios.get(`${BACKEND_URL}/attendance/attendanceList`, { withCredentials: true });
            setAttendance(res.data.attendance);
            setLoading(false);
        } catch (err) {
            console.error("Error", err);
            const errorMessage = err.response?.data?.message;
            if (errorMessage === "No attendance in the system. try to add some") {
                setError("No attendance in the system");
            }

            if (errorMessage === "Internal server error") {
                setError("Internal server error");
            }

            setLoading(false);
        }
    }

    useEffect(() => {
        handleGetAttendance();
    }, []);

}