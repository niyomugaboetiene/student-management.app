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
        <div className="bg-gray-100 p-3 min-h-screen">
            <div className="max-w-xl">
                <h2>Department list</h2>

                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
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