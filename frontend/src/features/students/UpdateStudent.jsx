import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UpdateStudent = () => {
    const [full_name, setFull_name] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [location, setLocation] = useState("");
    const [email, setEmail] = useState("");
    const [classe, setClasse] = useState("");
    const [gender, setGender] = useState("");
    const [trade, setTrade] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [tradeToSelect, setTradeToSelect] = useState(null);
    const [classToSelect, setClassToSelect] = useState(null);

    const navigate = useNavigate();

    const { _id } = useParams();

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const handleRegisterStudent = async () => {
        try {
             setLoading(true);
            //  full_name, gender, email, trade, phone, location, classe, password 
            if (!full_name || !phone || !password || !phone || !location || !gender || !classe || !password) {
                setMessage("");
                setError("Fill out some missing fields");
                return;
            }
            const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
            const res = await axios.post(`${BACKEND_URL}/student/update/${_id}`, {
                full_name,
                gender,
                email,
                trade,
                phone,
                location,
                classe,
                password
            }, { withCredentials: true });
 
          setLoading(false);
          setMessage(res.data.message);
          setError("");
        } catch (err) {
            setLoading(false);
            const errorMessage = err.response?.data?.message || "Error occured";

            if (errorMessage === "Email must be unique") {
               setMessage("");
               setError(errorMessage);
               console.message(errorMessage);
          }
          if (errorMessage === "Phone must be unique") {
               setMessage("");
               setError(errorMessage); 
          }

           setError(errorMessage);
           setMessage("");
        }
    }

    const handleGetTrade = async () => {
        try {
            setLoading(true);
            const tradeRes = await axios.get(`${BACKEND_URL}/student/auth/trade`);

            setTradeToSelect(tradeRes.data.trade);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    }
    
    const handleGetClass = async () => {
        try {
            setLoading(true);
            const classRes = await axios.get(`${BACKEND_URL}/student/auth/class/${trade}`);

            setClassToSelect(classRes.data.classes);
            // setLoading("result", classRes.data.classes);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    }

    useEffect(() => {
        handleGetTrade();
    }, []);

    useEffect(() => {
        if (trade) {
            handleGetClass();
        }
    }, [trade]);

    const handleGetSubject = async () => {
          try {
            if (!_id) return;
            setLoading(true);
            const trRes = await axios.get(`${BACKEND_URL}/student/${_id}`, { withCredentials: true });
            const StudentData = trRes.data.student || "";

            console.log("student name", StudentData);
            setFull_name(StudentData.full_name || "");
            setEmail(StudentData.email || "");
            setGender(StudentData.gender || "");
            setSubject_name(StudentData.full_name || "");
            setSubject_name(StudentData.full_name || "");

            setLoading(false);
          } catch (err) {
            console.error(err);
            setLoading(false);
          }
    }

    useEffect(() => {
        if (_id) {
            handleGetSubject();
        }
    }, [_id]);


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
                <h1 className="text-xl text-gray-600 font-bold">Register Student Portal</h1>

                <div className="mt-3">
                    <input type="text"  
                       onChange={(e) => setFull_name(e.target.value)} required
                       className="bg-gray-100  w-full p-3 rounded-full focus:outline-1 focus:outline-gray-500" placeholder="Full name"
                    />
                </div>
                
                <div className="mt-3">
                    <input type="text"  
                       onChange={(e) => setLocation(e.target.value)} required
                       className="bg-gray-100  w-full p-3 rounded-full focus:outline-1 focus:outline-gray-500" placeholder="District"
                    />
                </div>
                
                <div className="mt-3">
                    <input type="text"  
                       onChange={(e) => setEmail(e.target.value)} required
                       className="bg-gray-100  w-full p-3 rounded-full focus:outline-1 focus:outline-gray-500" placeholder="Email"
                    />
                </div>
                
                <div className="mt-3">
                    <input type="text"  
                    onChange={(e) => setPhone(e.target.value)} required
                    className="bg-gray-100 w-full p-3 rounded-full focus:outline-1 focus:outline-gray-500" placeholder="Phone"
                />
                </div>
                
                <div className="mt-3">
                    <select
                        onChange={(e) => setTrade(e.target.value)}
                       className="bg-gray-100 w-full p-3 rounded-full focus:outline-1 focus:outline-gray-500" placeholder="Class"
                   > 
                   <option disabled={true} value="">-----Select trade-----</option>
                   {tradeToSelect?.map((item) => (
                          <option value={item._id} key={item._id}>
                               {item.trade_name}
                         </option>
                       
                   ))}
                </select>
                </div>
               
                <div className="mt-3">
                    <select
                        value={classe}
                        onChange={(e) => {
                            setClasse(e.target.value)
                            console.log(e.target.value)
                        }}
                       className="bg-gray-100 w-full p-3 rounded-full focus:outline-1 focus:outline-gray-500"
                   > 
                  <option disabled={true} value="">-----Select class-----</option>
                   {classToSelect?.map((classs) => (
                          <option value={classs._id} key={classs._id}>
                               {classs.class_name}
                         </option>
                   ))}
                </select>
                </div>
                
                <div className="mt-3">
                    <input type="text"  
                    onChange={(e) => setGender(e.target.value)} required
                    className="bg-gray-100 w-full p-3 rounded-full focus:outline-1 focus:outline-gray-500" placeholder="Gender"
                />
                </div>
                
                <div className="mt-3 mb-4">
                    <input type="password"  
                       onChange={(e) => setPassword(e.target.value)} required
                       className="bg-gray-100 w-full rounded-full p-3 focus:outline-1 focus:outline-gray-500" placeholder="Password"
                    />
                </div>

                <button onClick={handleRegisterStudent} className="w-full bg-cyan-500 p-3 rounded-full text-white font-bold hover:bg-cyan-400 transition-colors mb-4">Create account</button>
                <hr />

                <Link className="flex items-center justify-center mt-2 text-cyan-500 hover:underline" to='/student/login'>login</Link>
            </div>
        </div>
    )
}

export default UpdateStudent;