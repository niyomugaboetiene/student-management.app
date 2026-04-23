import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UpdateSubject = () => {
    const [subject_name, setSubject_name] = useState("");
    const [code, setCode] = useState("");
    const [credits, setCredits] = useState(0);
    const [instructor, setInstructor] = useState("");
    const [classes, setClasses] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // subject_name, code, instructor, class: classes, credits 
    const [selectedInstructor, setSelectedInstructor] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null);
    const navigate = useNavigate();

    const { _id } = useParams();

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const handleGetClass = async () => {
          try {
            setIsLoading(true);
            const classRes = await axios.get(`${BACKEND_URL}/class/class_list`, { withCredentials: true });
            // console.log(classRes.data.classes);
            setSelectedClass(classRes.data.classes);
            setIsLoading(false);
          } catch (err) {
            console.error(err);
            setIsLoading(false);
          }
    }

    useEffect(() => {
        handleGetClass();
    }, []);
    
    const handleGetInstructor = async () => {
          try {
            setIsLoading(true);
            const trRes = await axios.get(`${BACKEND_URL}/teacher/class/${classes}`, { withCredentials: true });
            // console.log(trRes.data.teacher);
            setSelectedInstructor(trRes.data.teacher);
            setIsLoading(false);
          } catch (err) {
            console.error(err);
            setIsLoading(false);
          }
    }

    useEffect(() => {
        if (classes) {
            handleGetInstructor();
        }
    }, [classes]);

    const handleGetSubject = async () => {
          try {
            if (!_id) return;
            setIsLoading(true);
            const subRes = await axios.get(`${BACKEND_URL}/subjects/${_id}`, { withCredentials: true });
            const subjectData = subRes.data.subject;

            console.log("Subject name", subjectData);
            setSubject_name(subjectData.subject_name || "");
            setCode(subjectData.code || "");
            setInstructor(subjectData.instructor || "");
            setClasses(subjectData.class || "");
            setCredits(subjectData.credits || 0);

            setIsLoading(false);
          } catch (err) {
            console.error(err);
            setIsLoading(false);
          }
    }

    useEffect(() => {
        if (_id) {
            handleGetSubject();
        }
    }, [_id]);

    const handleUpdateTrade = async () => {
        try {
            setIsLoading(true);
            if (!subject_name || !code || !credits) {
                setError("Fill out the missing fields");
                return;
            }
            const res = await axios.put(`${BACKEND_URL}/subjects/update/${_id}`, { subject_name, code, instructor, classes, credits }, { withCredentials: true });
            setMessage(res.data.message);
            setIsLoading(false);
            navigate('/subject/list');
        } catch (err) {
            const errMessage = err.response?.data?.message || "Error occured"; 
            if (errMessage === "Internal server error") {
                setError(errMessage);
            }

            setIsLoading(false);
        }
    }

    return (
        <div className="bg-gray-100 min-h-screen flex justify-center items-center p-3">
            <div className="bg-white w-110 rounded-xl p-4 shadow-lg">
                {message  && (
                    <div className="bg-green-500 mb-2 p-2 rounded-lg text-white font-bold relative flex justify-between">
                        <p>{message}</p> <p className="text-lg mt-1" onClick={() => setMessage("")}><FaTimes /></p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-500 mb-2 p-2 rounded-lg text-white font-bold relative flex justify-between">
                        <p>{error}</p> <p className="text-lg mt-1" onClick={() => setError("")}><FaTimes /></p>
                    </div>                )}
                <h1 className="text-xl text-gray-600 font-bold">Update Subject Portal</h1>

                <div className="mt-3">
                    <input type="text"  
                       value={subject_name}
                       onChange={(e) => setSubject_name(e.target.value)} required
                       className="bg-gray-100  w-full p-3 rounded-full focus:outline-1 focus:outline-gray-500" placeholder="Subject name"
                    />
                </div>
                
                <div className="mt-3">
                    <input type="text"  
                    value={code}
                    onChange={(e) => setCode(e.target.value)} required
                    className="bg-gray-100 w-full p-3 rounded-full focus:outline-1 focus:outline-gray-500" placeholder="code"
                />
                </div>
                
                <div className="mt-3">
                    <input type="number"  
                    value={credits}
                    onChange={(e) => setCredits(e.target.value)} required
                    className="bg-gray-100 w-full p-3 rounded-full focus:outline-1 focus:outline-gray-500" placeholder="Credits"
                />
                </div>
                
               <div className="mt-3 mb-4">
                    <select  
                       value={classes}
                       onChange={(e) => setClasses(e.target.value)} 
                       className="bg-gray-100 w-full rounded-full p-3 focus:outline-1 focus:outline-gray-500"
                    > 

                       {selectedClass?.map((cla) => (
                        <option value={cla._id} key={cla._id}>{cla.class_name}</option>
                       ))}
                    </select>
                </div>

                <div className="mt-3 mb-4">
                    <select  
                       value={instructor}
                       onChange={(e) => setInstructor(e.target.value)} 
                       className="bg-gray-100 w-full rounded-full p-3 focus:outline-1 focus:outline-gray-500"
                    > 

                        <option value="">------Select instructor------</option>
                       {selectedInstructor?.map((ins) => (
                        <option value={ins._id} key={ins._id}>{ins.full_name}</option>
                       ))}
                    </select>
                </div>

                <button onClick={handleUpdateTrade} className="w-full bg-cyan-500 p-3 rounded-full text-white font-bold hover:bg-cyan-400 transition-colors mb-4">Update Subject</button>

            </div>
        </div>
    )
}

export default UpdateSubject;