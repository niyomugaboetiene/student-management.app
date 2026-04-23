import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

const MarksList = () => {
    const [marks, setMarks] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const handleGetMarks = async() => {
        try {
            setLoading(true);
            const res = await axios.get(`${BACKEND_URL}/marks/marks_list`, { withCredentials: true });
            setMarks(res.data.marks);
            setLoading(false);
        } catch (err) {
            console.error("Error", err);
            const errorMessage = err.response?.data?.message;
            if (errorMessage === "No marks in the system") {
                setError("No marks in the system");
            }

            if (errorMessage === "Internal server error") {
                setError("Internal server error");
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
                            <th className="py-3 px-4 text-left" colSpan={2}>Operations</th>
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

                                <td className="flex justify-between p-3">
                                    <Link className="inline-flex gap-2 bg-green-500 py-1 px-3 rounded-lg font-bold text-white" to={`/marks/update/${mark._id}`}><FaEdit /> Update</Link>
                                    <button className="inline-flex gap-2 bg-red-500 py-1 px-3 font-bold text-white rounded-lg"><FaTrash /> Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MarksList;