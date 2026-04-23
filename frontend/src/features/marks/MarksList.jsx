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


    return (
        <div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Student Name</th>
                            <th>Class</th>
                            <th>Subject</th>
                            <th>Marks</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    )
}