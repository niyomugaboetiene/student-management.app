import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

const AttendanceList = () => {
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

    // const DeleteAttendance = async (_id) => {
    //     const confrim = window.confirm("Are you sure ?");
    //     try {
    //         setLoading(true);
    //         if (confrim) {
    //               await axios.delete(`${BACKEND_URL}/attendance/delete/${_id}`, { withCredentials: true });
    //               await handleGetMarks();
    //              setLoading(false);
    //         }
    //     } catch (err) {
    //         console.error(err);
    //         const errorMessage = err.response?.data?.message || "Error occured";
    //         if (errorMessage === "No IDs in the system") {
    //             setError(errorMessage);
    //         }

    //         if (errorMessage === "Internal server error") {
    //             setError(errorMessage);
    //         }

    //         setLoading(false);
    //     }
    // }

    return (
        <div className="bg-cyan-100 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-center text-2xl font-bold text-cyan-700 mb-4">Attendance List</h1>
                <table className="w-full overflow-hidden overflow-x-auto">
                    <thead className="bg-cyan-300 text-gray-600">
                        <tr>
                            <th className="py-3 px-4 text-left">Id</th>
                            <th className="py-3 px-4 text-left">Student Name</th>
                            <th className="py-3 px-4 text-left">Class Name</th>
                            <th className="py-3 px-4 text-left">Marked By</th>
                            <th className="py-3 px-4 text-left">Date</th>
                            <th className="py-3 px-4 text-left">Done At</th>
                            <th className="py-3 px-4 text-left">Status</th>
                            {/* <th className="py-3 px-4 text-left" colSpan={2}>Operations</th> */}
                        </tr>
                    </thead>

                    <tbody>
                        {attendance.map((attend, index) => (
                            <tr key={index} className={`${index % 2 === 0 ? 'bg-cyan-200' : 'bg-gray-100'} ${index % 2 == 0 ? 'hover:bg-cyan-300' : 'hover:bg-gray-200'} transition-colors`}>
                                <td className="py-3 px-4 text-left">{attend.attendance_id}</td>
                                <td className="py-3 px-4 text-left">{attend.student?.full_name ? attend.student?.full_name : "No student"}</td>
                                <td className="py-3 px-4 text-left">{attend.class?.class_name ? attend.class?.class_name : "No class"}</td>
                                <td className="py-3 px-4 text-left">{attend.marked_by?.full_name ? attend.marked_by?.full_name : "No marker"}</td>
                                <td className="py-3 px-4 text-left">{new Date(attend.date).toLocaleDateString()}</td>
                                <td className="py-3 px-4 text-left">{new Date(attend.createdAt).toLocaleDateString()}</td>
                                <td className={`rounded-full flex h-8 w-20 font-bold ${attend.status === "present" ? 'bg-green-500' : 'bg-red-500'} text-white text-center`}>{attend.status}</td>
{/* 
                                <td className="flex justify-between p-3">
                                    <Link className="inline-flex gap-2 bg-green-500 py-1 px-3 rounded-lg font-bold text-white" to={`/marks/update/${mark._id}`}><FaEdit /> Update</Link>
                                    <button className="inline-flex gap-2 bg-red-500 py-1 px-3 font-bold text-white rounded-lg" onClick={() => DeleteMarks(mark._id)}><FaTrash /> Delete</button>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AttendanceList;