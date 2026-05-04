import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UpdateTeacher = () => {
    const [full_name, setFull_name] = useState("");
    const [email, setEmail] = useState("");
    const [qualification, setQualification] = useState(0);
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [experience, setExperience] = useState("");
    const [department, setDpeartment] = useState("");
    const [salary, setSalary] = useState("");
    const [classe, setClasse] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [selectedDepartment, setSelectedDepartment] = useState(null);
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
    
    const handleGetDepartment = async () => {
          try {
            setIsLoading(true);
            const trRes = await axios.get(`${BACKEND_URL}/department/department_list`, { withCredentials: true });
            // console.log(trRes.data.teacher);
            setSelectedDepartment(trRes.data.department);
            setIsLoading(false);
          } catch (err) {
            console.error(err);
            setIsLoading(false);
          }
    }

    useEffect(() => {
            handleGetDepartment();
    }, []);

    const handleGetTeacher = async () => {
          try {
            if (!_id) return;
            setIsLoading(true);
            const trRes = await axios.get(`${BACKEND_URL}/teacher/${_id}`, { withCredentials: true });
            const TeacherData = trRes.data.teacher || "";

            console.log("Teacher name", TeacherData);

            setFull_name(TeacherData.full_name || "");
            setDpeartment(TeacherData.department?._id || "");
            setClasse(TeacherData.class?._id || "");
            setEmail(TeacherData.email || "");
            setQualification(TeacherData.qualification || "");
            setGender(TeacherData.gender || "");
            setSalary(TeacherData.salary || "");
            setPhone(TeacherData.phone || "");
            setExperience(TeacherData.experience || "");

            setIsLoading(false);
          } catch (err) {
            console.error(err);
            setIsLoading(false);
          }
    }

    useEffect(() => {
        if (_id) {
            handleGetTeacher();
        }
    }, [_id]);

    const handleUpdateTeachers = async () => {
        try {
            setIsLoading(true);
            const res = await axios.put(`${BACKEND_URL}/teacher/update/${_id}`, { full_name, email, qualification, phone, gender, experience, department, salary, classe }, { withCredentials: true });
            setMessage(res.data.message);
            setIsLoading(false);
            navigate('/teacher/list');
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
                           </div>
                        )}
                       {isLoading && (
                         <div className="flex justify-center items-center">
                            <div className="h-8 w-8 text-cyan-500 border-transparent animate-spin"></div>
                         </div>
                        )}
                       <h1 className="text-xl text-gray-600 font-bold">Update Teacher Portal</h1>
       
                       <div className="mt-3">
                           <input type="text"  
                              value={full_name}
                              onChange={(e) => setFull_name(e.target.value)} required
                              className="bg-gray-100  w-full p-3 rounded-full focus:outline-1 focus:outline-gray-500" placeholder="Full name"
                           />
                       </div>
                       
                       <div className="mt-3">
                           <input type="text"  
                              value={qualification}
                              onChange={(e) => setQualification(e.target.value)} required
                              className="bg-gray-100  w-full p-3 rounded-full focus:outline-1 focus:outline-gray-500" placeholder="Qualification"
                           />
                       </div>
                       
                       <div className="mt-3">
                           <input type="text"  
                             value={email}
                              onChange={(e) => setEmail(e.target.value)} required
                              className="bg-gray-100  w-full p-3 rounded-full focus:outline-1 focus:outline-gray-500" placeholder="Email"
                           />
                       </div>
                       
                       <div className="mt-3">
                           <input type="text"  
                           value={phone}
                           onChange={(e) => setPhone(e.target.value)} required
                           className="bg-gray-100 w-full p-3 rounded-full focus:outline-1 focus:outline-gray-500" placeholder="Phone"
                       />
                       </div>       
       
                       <div className="mt-3">
                           <input type="number"  
                            value={salary}
                           onChange={(e) => setSalary(e.target.value)} required
                           className="bg-gray-100 w-full p-3 rounded-full focus:outline-1 focus:outline-gray-500" placeholder="Salary"
                       />
                       </div>         
                       
                       <div className="mt-3">
                           <input type="number"  
                           value={experience}
                           onChange={(e) => setExperience(e.target.value)} required
                           className="bg-gray-100 w-full p-3 rounded-full focus:outline-1 focus:outline-gray-500" placeholder="Experience"
                       />
                       </div>
                      
                       <div className="mt-3">
                           <select
                               value={department}
                               onChange={(e) => {
                                   setDpeartment(e.target.value)
                                   console.log(e.target.value)
                               }}
                              className="bg-gray-100 w-full p-3 rounded-full focus:outline-1 focus:outline-gray-500"
                          > 
                         <option disabled={true} value="">-----Select Department-----</option>
                          {selectedDepartment?.map((dep) => (
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
                          {selectedClass?.map((cla) => (
                                 <option value={cla._id} key={cla._id}>
                                      {cla.class_name}
                                </option>
                          ))}
                       </select>
                       </div>
                       
                       <div className="mt-3">
                           <input type="text"  
                           value={gender}
                           onChange={(e) => setGender(e.target.value)} required
                           className="bg-gray-100 w-full p-3 rounded-full focus:outline-1 focus:outline-gray-500" placeholder="Gender"
                       />
                       </div>
       
                       <button onClick={handleUpdateTeachers} className="w-full mt-4 bg-cyan-500 p-3 rounded-full text-white font-bold hover:bg-cyan-400 transition-colors mb-4">Update Teacher</button>
                   </div>
               </div>
    )
}

export default UpdateTeacher;