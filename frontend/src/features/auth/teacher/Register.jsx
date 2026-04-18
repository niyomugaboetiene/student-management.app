import React, { use, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";

const TeacherRegister = () => {
    const [full_name, setFull_name] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [department, setDepartment] = useState("");
    const [email, setEmail] = useState("");
    const [classe, setClasse] = useState("");
    const [gender, setGender] = useState("");
    const [qualification, setQualification] = useState("");
    const [experience, setExprerience] = useState("");
    const [salary, setSalary] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [departmentToBeSelected, setDepartmentToBeSelected] = useState(null);
    const [classToSelect, setClassToSelect] = useState([]);
    //  full_name,  email, qualification, phone, gender, experience, department, salary, class,

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const handleRegisterTeacher = async () => {
        try {
             setLoading(true);
              console.log("Received data", classe);
            //  full_name, gender, email, trade, phone, location, classe, password 
            if (!full_name || !phone || !password || !qualification || !experience || !gender || !classe || !salary || !department) {
                setMessage("");
                setError("Fill out some missing fields");
                return;
            }
            const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
            const res = await axios.post(`${BACKEND_URL}/teacher/auth/register`, {
                full_name,
                gender,
                email,
                qualification,
                phone,
                experience,
                classe,
                salary,
                department,
                password
            }, { withCredentials: true });
 
          setLoading(false);
          setMessage(res.data.message);
          setError("");
        } catch (err) {
            setLoading(false);
            const errorMessage = err.response?.data?.message || "Error occured";

            if (errorMessage === "Login first") {
               setMessage("");
               setError(errorMessage);
               console.message(errorMessage);
          }
          if (errorMessage === "You dont have access to this data") {
               setMessage("");
               setError(errorMessage); 
          }

           setError(errorMessage);
           setMessage("");
        }
    }

    
    const handleGetClass = async () => {
        try {
            setLoading(true);
            const classRes = await axios.get(`${BACKEND_URL}/class/class_list`);

            setClassToSelect(Array.isArray(classRes.data.classes) ? classRes.data.classes : [classRes.data.classes]);      
            console.log(classRes.data.classes);      
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    }    


    const handleGetDepartment = async () => {
        try {
            setLoading(true);
            const departmentRes = await axios.get(`${BACKEND_URL}/department/department_list`);

            setDepartmentToBeSelected(departmentRes.data.department);
            // setLoading("result", classRes.data.classes);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    }

    useEffect(() => {
          handleGetClass();
    }, []);
    
    useEffect(() => {
          handleGetDepartment();
    }, []);

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
                <h1 className="text-xl text-gray-600 font-bold">Register Teacher Portal</h1>

                <div className="mt-3">
                    <input type="text"  
                       onChange={(e) => setFull_name(e.target.value)} required
                       className="bg-gray-100  w-full p-3 rounded-full focus:outline-1 focus:outline-gray-500" placeholder="Full name"
                    />
                </div>
                
                <div className="mt-3">
                    <input type="text"  
                       onChange={(e) => setQualification(e.target.value)} required
                       className="bg-gray-100  w-full p-3 rounded-full focus:outline-1 focus:outline-gray-500" placeholder="Qualification"
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
                    <input type="number"  
                    onChange={(e) => setSalary(e.target.value)} required
                    className="bg-gray-100 w-full p-3 rounded-full focus:outline-1 focus:outline-gray-500" placeholder="Salary"
                />
                </div>         
                
                <div className="mt-3">
                    <input type="number"  
                    onChange={(e) => setExprerience(e.target.value)} required
                    className="bg-gray-100 w-full p-3 rounded-full focus:outline-1 focus:outline-gray-500" placeholder="Experience"
                />
                </div>
               
                <div className="mt-3">
                    <select
                        value={department}
                        onChange={(e) => {
                            setDepartment(e.target.value)
                            console.log(e.target.value)
                        }}
                       className="bg-gray-100 w-full p-3 rounded-full focus:outline-1 focus:outline-gray-500"
                   > 
                  <option disabled={true} value="">-----Select Department-----</option>
                   {departmentToBeSelected?.map((dep) => (
                          <option value={dep._id} key={dep._id}>
                               {dep.name}
                         </option>
                   ))}
                </select>
                </div>
                
                <div className="mt-3">
                    <select
                        value={classe}
                        onChange={(e) => { setClasse(e.target.value)}}
                       className="bg-gray-100 w-full p-3 rounded-full focus:outline-1 focus:outline-gray-500"
                   > 
                  <option disabled={true} value="">-----Select class-----</option>
                   {classToSelect?.map((cla) => (
                          <option value={cla._id} key={cla._id}>
                               {cla.class_name}
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

                <button onClick={handleRegisterTeacher} className="w-full bg-cyan-500 p-3 rounded-full text-white font-bold hover:bg-cyan-400 transition-colors mb-4">Create account</button>
            </div>
        </div>
    )
}

export default TeacherRegister;