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
            const stRes = await axios.get(`${BACKEND_URL}/students/studentList`, { withCredentials: true });
            setStudent(stRes.data.student);
            setLoading(false);
        } catch (err) {
            console.error(err);
            const errorMessage = err.response?.data?.message;
            if (errorMessage === "No student in database") {
                setError(errorMessage);
            }


            if (errorMessage === "Server error") {
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
                <h1 className="ms-120 text-2xl mb-3 text-cyan-700 font-bold">Students List</h1>
                <table className="w-full overflow-hidden overflow-x-auto">
                    <thead className="bg-cyan-400 rounded-2xl">
                        <tr className="">
                            <th className="py-3 text-white font-bold">Id</th>
                            <th className="py-3 text-white font-bold">Full name</th>
                            <th className="py-3 text-white font-bold">Email</th>
                            <th className="py-3 text-white font-bold">Phone</th>
                            <th className="py-3 text-white font-bold">Location</th>
                            <th className="py-3 text-white font-bold">Joined at</th>
                            <th colSpan={2} className="py-2 text-white font-bold">Opearation</th>
                        </tr>
                    </thead>

                    <tbody>
                        {/* full_name
"Kayinamura eric"
email
phone
location
createdAt */}
                        {student?.map((stu, index) => (
                            <tr key={stu._id} className={`${index % 2 === 0 ? 'bg-gray-200' : 'bg-cyan-300'} hover:${index % 2 === 0 ? 'bg-gray-500' : 'bg-cyan-400'} transition-colors`}>
                                <td className="py-3 text-gray-700 px-7 font-bold">{stu.student_id}</td>
                                <td className="py-3 text-gray-700 px-7 font-bold">{stu.full_name}</td>
                                <td className="py-3 text-gray-700 px-7 font-bold">{stu.email}</td>
                                <td className="py-3 text-gray-700 px-7 font-bold">{stu.phone}</td>
                                <td className="py-3 text-gray-700 px-7 font-bold">{stu.class?.class_name ? stu.class?.class_name : "No class"}</td>
                                <td className="py-3 text-gray-700 px-7 font-bold">{stu.credits}</td>

                                <td className="py-3 px-3 font-bold flex justify-between space-x-5">
                                    <Link className="bg-green-500 py-1 px-5 rounded-xl text-white hover:bg-green-600 transition-colors" to={`/student/update/${stu._id}`}>Update</Link>
                                    <button className="bg-red-500 py-1 px-5 rounded-xl text-white hover:bg-red-600 transition-colors" onClick={() => handleDeleteSubject(stu._id)}>Delete</button>
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