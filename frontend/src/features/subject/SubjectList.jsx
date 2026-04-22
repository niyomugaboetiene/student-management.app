import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const GetSubjectList = () => {
    const [subject, setSubject] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleGetSubjectList = async () => {
       const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

        try {
            setLoading(true);
            const subRes = await axios.get(`${BACKEND_URL}/subjects/subjectList`, { withCredentials: true });
            setSubject(subRes.data.subject);
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
    handleGetSubjectList();
  }, []);

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <h1 className="ms-76 text-2xl mb-3 text-cyan-700 font-bold">Subject List</h1>
                <table className="w-full ">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Code</th>
                            <th>Subject name</th>
                            <th>Instructor</th>
                            <th>Class</th>
                            <th>Credits</th>
                            <th colSpan={2}>Opearation</th>
                        </tr>
                    </thead>

                    <tbody>
                        {subject.map((sub, index) => (
                            <tr key={sub._id}>
                                {/* subject_name, code, instructor, class: classes, credits  */}
                                <td>{sub.subject_id}</td>
                                <td>{sub.subject_name}</td>
                                <td>{sub.code}</td>
                                <td>{sub.instructor?.full_name ? sub.instructor?.full_name : "No instructor"}</td>
                                <td>{sub.class?.class_name ? sub.class?.class_name : "No class"}</td>
                                <td>{sub.credits}</td>

                                <td>
                                    <Link>Update</Link>
                                    <button>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default GetSubjectList;