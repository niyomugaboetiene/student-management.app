import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

const ClassList = () => {
    const [classes, setClasses] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const handleGetClass = async() => {
        try {
            setLoading(true);
            const res = await axios.get(`${BACKEND_URL}/class/class_list`, { withCredentials: true });
            setClasses(res.data.classes);
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
        handleGetClass();
    }, []);

    const DeleteClass = async (_id) => {
        const confrim = window.confirm("Are you sure ?");
        try {
            setLoading(true);
            if (confrim) {
                  await axios.delete(`${BACKEND_URL}/marks/delete/${_id}`, { withCredentials: true });
                  await handleGetMarks();
                 setLoading(false);
            }
        } catch (err) {
            console.error(err);
            const errorMessage = err.response?.data?.message || "Error occured";
            if (errorMessage === "No IDs in the system") {
                setError(errorMessage);
            }

            if (errorMessage === "Internal server error") {
                setError(errorMessage);
            }

            setLoading(false);
        }
    }

    return (
        <div className="bg-cyan-100 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-center text-2xl font-bold text-cyan-700 mb-4">Marks List</h1>
                <table className="w-full overflow-hidden overflow-x-auto">
                    <thead className="bg-cyan-300 text-gray-600">
                        <tr>
                            <th className="py-3 px-4 text-left">Id</th>
                            <th className="py-3 px-4 text-left">Class Name</th>
                            <th className="py-3 px-4 text-left">Code</th>
                            <th className="py-3 px-4 text-left">Class Teacher</th>
                            <th className="py-3 px-4 text-left">Trade</th>
                            <th className="py-3 px-4 text-left">Created by</th>
                            <th className="py-3 px-4 text-left">Year</th>
                            <th className="py-3 px-4 text-left">Done at</th>
                            <th className="py-3 px-4 text-left" colSpan={2}>Operations</th>
                        </tr>
                    </thead>

                    <tbody>
                        {classes.map((cla, index) => (
                            <tr key={index} className={`${index % 2 === 0 ? 'bg-cyan-200' : 'bg-gray-100'} ${index % 2 == 0 ? 'hover:bg-cyan-300' : 'hover:bg-gray-200'} transition-colors`}>
                                <td className="py-3 px-4 text-left">{cla.class_id}</td>
                                <td className="py-3 px-4 text-left">{cla.class_name}</td>
                                <td className="py-3 px-4 text-left">{cla.code}</td>
                                <td className="py-3 px-4 text-left">{cla.teacher?.full_name ? cla.teacher?.full_name : "No class teacher"}</td>
                                <td className="py-3 px-4 text-left">{cla.trade?.trade_name ? cla.trade?.trade_name : "No trade"}</td>
                                <td className="py-3 px-4 text-left">Admin</td>
                                <td className="py-3 px-4 text-left">{cla.year}</td>
                                <td className="py-3 px-4 text-left">{new Date(cla.createdAt).toLocaleDateString()}</td>

                                <td className="flex justify-between p-3 space-x-6">
                                    <Link className="inline-flex gap-2 bg-green-500 py-1 px-3 rounded-lg font-bold text-white" to={`/marks/update/${cla._id}`}><FaEdit /> Update</Link>
                                    <button className="inline-flex gap-2 bg-red-500 py-1 px-3 font-bold text-white rounded-lg" onClick={() => DeleteClass(mark._id)}><FaTrash /> Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ClassList;