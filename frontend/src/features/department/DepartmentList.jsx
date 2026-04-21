import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaTrash, FaEdit} from "react-icons/fa";

const DepartmentList = () => {
    const [department, setDepartment] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");


    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const handleGetDepartment = async () => {
        try {
            setLoading(true);
            const depRes = await axios.get(`${BACKEND_URL}/department/department_list`, { withCredentials: true });
            setDepartment(depRes.data.department);
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


    return (
        <div className="bg-cyan-50 p-3 min-h-screen">
            <div className="max-w-6xl mx-auto mt-5">
                <h2 className="text-center text-2xl mb-4 font-bold text-cyan-700">Department list</h2>

                <div className="rounded-lg ">
                    <table className="w-full border-cyan-300 rounded-xl">
                        <thead className="bg-cyan-500 text-white">
                            <tr>
                                <th className="py-3">Id</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Building</th>
                                <th>HOD</th>
                                <th>Created At</th>
                                <th colSpan={2}>Operation</th>
                            </tr>
                        </thead>

                        <tbody>
                            {department?.map((dep) => (
                                <tr key={dep._id}>
                                    <td>{dep.department_id}</td>
                                    <td>{dep.name}</td>
                                    <td>{dep.description}</td>
                                    <td>{dep.building}</td>
                                    <td>{dep.HOD}</td>
                                    <td>{new Date(dep.createdAt).toLocaleDateString()}</td>

                                    <td>
                                        <Link className="inline-flex"><FaEdit/> Edit</Link>
                                        <Link className="inline-flex"><FaTrash /> Delete</Link>
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