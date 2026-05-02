import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

const TeacherList = () => {
    const [teacher, setTeacher] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const handleGetTeacher = async() => {
        try {
            setLoading(true);
            const res = await axios.get(`${BACKEND_URL}/teacher/teacher_list`, { withCredentials: true });
            setTeacher(res.data.teacher);
            setLoading(false);
        } catch (err) {
            console.error("Error", err);
            const errorMessage = err.response?.data?.message;
            if (errorMessage === "No teachers in the system") {
                setError(errorMessage);
            }

            if (errorMessage === "Internal server error") {
                setError("Internal server error");
            }
            
            if (errorMessage === "Login first") {
                setError(errorMessage);
            }
            
            if (errorMessage === "You dont have access to this data") {
                setError(errorMessage);
            }

            setLoading(false);
        }
    }

    useEffect(() => {
        handleGetTeacher();
    }, []);

    const DeleteTeacher = async (_id) => {
        const confrim = window.confirm("Are you sure ?");
        try {
            setLoading(true);
            if (confrim) {
                  await axios.delete(`${BACKEND_URL}/class/delete/${_id}`, { withCredentials: true });
                  await handleGetClass();
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
            <div className="max-w-400 mx-auto">
                <h1 className="text-center text-2xl font-bold text-cyan-700 mb-4">Student List</h1>
                <table className="w-full overflow-hidden overflow-x-auto">
                    <thead className="bg-cyan-300 text-gray-600">
                        <tr>
                            <th className="py-3 px-4 text-left">Id</th>
                            <th className="py-3 px-4 text-left">Full Name</th>
                            <th className="py-3 px-4 text-left">Email</th>
                            <th className="py-3 px-4 text-left">Qualification</th>
                            <th className="py-3 px-4 text-left">Phone</th>
                            <th className="py-3 px-4 text-left">Gender</th>
                            <th className="py-3 px-4 text-left">Experience</th>
                            <th className="py-3 px-4 text-left">Department</th>
                            <th className="py-3 px-4 text-left">Salary</th>
                            <th className="py-3 px-4 text-left">Class</th>
                            <th className="py-3 px-4 text-left">Done at</th>
                            <th className="py-3 px-4 text-left" colSpan={2}>Operations</th>
                        </tr>
                    </thead>

                    <tbody>

                        {teacher?.map((tr, index) => (
                            <tr key={index} className={`${index % 2 === 0 ? 'bg-cyan-200' : 'bg-gray-100'} ${index % 2 == 0 ? 'hover:bg-cyan-300' : 'hover:bg-gray-200'} transition-colors`}>
                                <td className="py-3 px-4 text-left">{tr.teacher_id}</td>
                                <td className="py-3 px-4 text-left">{tr.full_name}</td>
                                <td className="py-3 px-4 text-left">{tr.email}</td>
                                <td className="py-3 px-4 text-left">{tr.qualification}</td>
                                <td className="py-3 px-4 text-left">{tr.phone}</td>
                                <td className="py-3 px-4 text-left">{tr.gender}</td>
                                <td className="py-3 px-4 text-left">{tr.experience}</td>
                                <td className="py-3 px-4 text-left">{tr.department?.name ? tr.department?.name : "No Department"}</td>
                                <td className="py-3 px-4 text-left">{tr.salary}</td>
                                <td className="py-3 px-4 text-left">{tr.class[0]?.class_name ? tr.class[0]?.class_name : "No Class"}</td>
                                <td className="py-3 px-4 text-left">{new Date(tr.createdAt).toLocaleDateString()}</td>

                                <td className="flex justify-between p-3 space-x-6">
                                    <Link className="inline-flex gap-2 bg-green-500 py-1 px-3 rounded-lg font-bold text-white" to={`/teacher/update/${tr._id}`}><FaEdit /> Update</Link>
                                    <button className="inline-flex gap-2 bg-red-500 py-1 px-3 font-bold text-white rounded-lg" onClick={() => DeleteTeacher(tr._id)}><FaTrash /> Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TeacherList;