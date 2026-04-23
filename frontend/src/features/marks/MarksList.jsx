import axios from "axios";
import { useState, useEffect } from "react";

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
                <h1 className="text-center mt-12 text-2xl font-bold text-cyan-700 mb-4">Marks List</h1>
                <table className="w-full overflow-hidden overflow-x-auto">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Student Name</th>
                            <th>Class</th>
                            <th>Subject</th>
                            <th>Marks</th>
                            <th>Done at</th>
                        </tr>
                    </thead>

                    <tbody>
                        {marks.map((mark, index) => (
                            <tr key={index}>
                                <td>{mark.marks_id}</td>
                                <td>{mark.student?.full_name}</td>
                                <td>{mark.class?.class_name}</td>
                                <td>{mark.subject?.subject_name}</td>
                                <td>{mark.marks}</td>
                                <td>{new Date(mark.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MarksList;