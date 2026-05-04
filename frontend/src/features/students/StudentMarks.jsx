import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

const StudentMarks = () => {
    const [marks, setMarks] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const handleGetMarks = async() => {
        try {
            setLoading(true);
            const res = await axios.get(`${BACKEND_URL}/student/auth/getMarks`, { withCredentials: true });
            setMarks(res.data.mark);
            setLoading(false);
        } catch (err) {
            console.error("Error", err);
            const errorMessage = err.response?.data?.message;
            if (errorMessage === "Login please") {
                setError("Unauthorized please login.");
            }

            if (errorMessage === "No marks") {
                setError("You dont have any marks yet");
            }
            
            if (errorMessage === "Internal server error") {
                setError(errorMessage);
            }

            setLoading(false);
        }
    }

    useEffect(() => {
        handleGetMarks();
    }, []);


    return (
        <div className="bg-cyan-100 min-h-screen">
            <div className="max-w-7xl mx-auto">
               {loading && (
                    <div className="flex justify-center items-center">
                        <div className="h-8 w-8 text-cyan-500 border-transparent animate-spin"></div>
                    </div>
                )}
                <h1 className="text-center text-2xl font-bold text-cyan-700 mb-4">Marks List</h1>
                <table className="w-full overflow-hidden overflow-x-auto">
                    <thead className="bg-cyan-300 text-gray-600">
                        <tr>
                            <th className="py-3 px-4 text-left">Id</th>
                            <th className="py-3 px-4 text-left">Student Name</th>
                            <th className="py-3 px-4 text-left">Class</th>
                            <th className="py-3 px-4 text-left">Subject</th>
                            <th className="py-3 px-4 text-left">Marks</th>
                            <th className="py-3 px-4 text-left">Done at</th>
                        </tr>
                    </thead>

                    <tbody>
                        {marks.map((mark, index) => (
                            <tr key={index} className={`${index % 2 === 0 ? 'bg-cyan-200' : 'bg-gray-100'} ${index % 2 == 0 ? 'hover:bg-cyan-300' : 'hover:bg-gray-200'} transition-colors`}>
                                <td className="py-3 px-4 text-left">{mark.marks_id}</td>
                                <td className="py-3 px-4 text-left">{mark.student?.full_name}</td>
                                <td className="py-3 px-4 text-left">{mark.class?.class_name}</td>
                                <td className="py-3 px-4 text-left">{mark.subject?.subject_name}</td>
                                <td className="py-3 px-4 text-left">{mark.marks}</td>
                                <td className="py-3 px-4 text-left">{new Date(mark.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default StudentMarks;