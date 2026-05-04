import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaTrash, FaEdit} from "react-icons/fa";

const DepartmentList = () => {
    const [department, setDepartment] = useState(null);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState("");


    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const handleGetDepartment = async () => {
        try {
            setLoading(true);
            const depRes = await axios.get(`${BACKEND_URL}/department/department_list`, { withCredentials: true });
            setDepartment(depRes.data.department);
            console.log("Data", depRes.data.department);
            setLoading(false);
        } catch (err) {
            console.error(err);
            const errorMessage = err.response?.data?.error || "Error message";
            setError(errorMessage);
        }
    } 

    useEffect(() => {
        handleGetDepartment();
    }, []);

    const HandleDeleteDepartment = async (_id) => {
        if (!_id) {
            setMessage("Ids is required for this action");
            return;
        }

        const confrimation = window.confirm("Are you sure you want to delete department ?");
        if (!confrimation) return;

        try {
            setLoading(true);
            await axios.delete(`${BACKEND_URL}/department/delete/${_id}`, { withCredentials: true });

            await handleGetDepartment();
            
            setLoading(false);
        } catch (err) {
            console.error(err);
            const errorMessage = err.response?.data?.message || "Error occured";

            if (errorMessage === "Enter a valid IDs") {
                setMessage("Enter a valid IDs");
            }

            if (errorMessage === "Server error") {
                setMessage(errorMessage);
            }
        }
    }

    return (
        <div className="bg-cyan-50 p-3 min-h-screen">
            <div className="max-w-7xl mx-auto mt-5">
                {loading && (
                    <div className="flex justify-center items-center">
                        <div className="h-8 w-8 text-cyan-500 border-transparent animate-spin"></div>
                    </div>
                )}
                <h2 className="text-center text-2xl mb-4 font-bold text-cyan-700">Department list</h2>

                <div className="rounded-lg ">
                    <table className="w-full border-cyan-300 rounded-xl">
                        <thead className="bg-cyan-500 text-white">
                            <tr>
                                <th className="py-3 px-2">Id</th>
                                <th className="py-3 px-2">Name</th>
                                <th className="py-3 px-2">Description</th>
                                <th className="py-3 px-2">Building</th>
                                <th className="py-3 px-2">HOD</th>
                                <th className="py-3 px-2">Created At</th>
                                <th colSpan={2} className="py-3 px-2">Operation</th>
                            </tr>
                        </thead>

                        <tbody className="bg-gray-100">
                            {department?.map((dep, index) => (
                                <tr key={dep._id} className={`${index % 2 === 0 ? 'bg-cyan-200' : 'bg-gray-100'} hover:${index % 2 === 0 ? 'bg-cyan-400' : 'bg-gray-400'} transition-colors text-gray-700`}>
                                    <td className="py-3 px-4">{dep.department_id}</td>
                                    <td className="py-3 px-4">{dep.name}</td>
                                    <td className="py-3 px-4">{dep.description ? dep.description : "No description"}</td>
                                    <td className="py-3 px-4">{dep.building}</td>
                                    <td className="py-3 px-4">{dep.HOD?.full_name ? dep.HOD?.full_name : "No HOD"}</td>
                                    <td className="py-3 px-4">{new Date(dep.createdAt).toLocaleDateString()}</td>

                                    <td className="py-3 px-3 flex justify-between">
                                        <Link className="inline-flex gap-2 bg-green-500 px-5 py-1 rounded-lg text-white font-bold hover:bg-green-600 transition-colors" to={`/department/update/${dep._id}`}><FaEdit className="mt-1"/> Edit</Link>
                                        <button className="inline-flex gap-2 bg-red-500 px-5 py-1 rounded-lg text-white font-bold hover:bg-red-600 transition-colors" onClick={() => HandleDeleteDepartment(dep._id)}><FaTrash className="mt-1"/> Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default DepartmentList;