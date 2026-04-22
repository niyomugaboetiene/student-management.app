import axios from "axios";
import { useState, useEffect } from "react";

const GetSubjectList = () => {
    const [subject, setSubject] = useState(null);
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


    return (
        <div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    )
}