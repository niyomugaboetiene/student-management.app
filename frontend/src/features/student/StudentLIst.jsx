import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const GetStudentList = () => {
    const [student, setStudent] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const handleGetStudentList = async () => {
        try {
            setLoading(true);
            const subRes = await axios.get(`${BACKEND_URL}/students/studentList`, { withCredentials: true });
            setSubject(subRes.data.student);
            setLoading(false);
        } catch (err) {
            console.error(err);
            const errorMessage = err.response?.data?.error;
            if (errorMessage === "No subject in the system") {
                setError(errorMessage);
            }


            if (errorMessage === "Internal server error") {
                setError(errorMessage);
            }
        setLoading(false);

        }
    }

  useEffect(() => {
    handleGetStudentList();
  }, []);

  const handleDeleteSubject = async (_id) => {
    const confrim = window.confirm("Are you sure ?");
    try {
        setLoading(true);
      if (confrim) {
         await axios.delete(`${BACKEND_URL}/subjects/delete/${_id}`, { withCredentials: true });
      } 

      await handleGetSubjectList();
      setLoading(false);
    } catch (err) {
        console.error("Error", err);
        setError("Failed to delete subject");
        setLoading(false);
    }
  }

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <h1 className="ms-120 text-2xl mb-3 text-cyan-700 font-bold">Subject List</h1>
                <table className="w-full overflow-hidden overflow-x-auto">
                    <thead className="bg-cyan-400 rounded-2xl">
                        <tr className="">
                            <th className="py-3 text-white font-bold">Id</th>
                            <th className="py-3 text-white font-bold">Code</th>
                            <th className="py-3 text-white font-bold">Subject name</th>
                            <th className="py-3 text-white font-bold">Instructor</th>
                            <th className="py-3 text-white font-bold">Class</th>
                            <th className="py-3 text-white font-bold">Credits</th>
                            <th colSpan={2} className="py-2 text-white font-bold">Opearation</th>
                        </tr>
                    </thead>

                    <tbody>
                        {subject.map((sub, index) => (
                            <tr key={sub._id} className={`${index % 2 === 0 ? 'bg-gray-200' : 'bg-cyan-300'} hover:${index % 2 === 0 ? 'bg-gray-500' : 'bg-cyan-400'} transition-colors`}>
                                <td className="py-3 text-gray-700 px-7 font-bold">{sub.subject_id}</td>
                                <td className="py-3 text-gray-700 px-7 font-bold">{sub.code}</td>
                                <td className="py-3 text-gray-700 px-7 font-bold">{sub.subject_name}</td>
                                <td className="py-3 text-gray-700 px-7 font-bold">{sub.instructor?.full_name ? sub.instructor?.full_name : "No instructor"}</td>
                                <td className="py-3 text-gray-700 px-7 font-bold">{sub.class?.class_name ? sub.class?.class_name : "No class"}</td>
                                <td className="py-3 text-gray-700 px-7 font-bold">{sub.credits}</td>

                                <td className="py-3 px-3 font-bold flex justify-between space-x-5">
                                    <Link className="bg-green-500 py-1 px-5 rounded-xl text-white hover:bg-green-600 transition-colors" to={`/subject/update/${sub._id}`}>Update</Link>
                                    <button className="bg-red-500 py-1 px-5 rounded-xl text-white hover:bg-red-600 transition-colors" onClick={() => handleDeleteSubject(sub._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default GetStudentList;

// predesingned widget, flutter management system, setup environment