import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [totalClass, setTotalClass] = useState(0);
  const [totalSubject, setTotalSubject] = useState(0);
  const [totalStudent, setTotalStudent] = useState(0);
  const [totalTeacher, setTotalTeacher] = useState(0);
  const [totalTrade, setTotalTrade] = useState(0);
  const [totalDepartment, setTotalDepartment] = useState(0);

  const [isNameClicked, setIsNameClicked] = useState(false);

  const navigate = useNavigate();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const FetchUserSession = async () => {
       try {

         setIsLoading(true);  
          const userRes = await axios.get(`${BACKEND_URL}/teacher/auth/userSession`, { withCredentials: true });
          console.log("Session", userRes.data.user);
          setUser(userRes.data.user);
          setIsLoading(false);
       } catch (err) {
         console.error(err);
         setIsLoading(false);
    }
}

    const handleLogout = async () => {
       try {
         setIsLoading(true);  
          await axios.post(`${BACKEND_URL}/teacher/auth/logout`, {}, { withCredentials: true });
          setUser(null);
          navigate('/admin/login');
          setIsLoading(false);
       } catch (err) {
         console.error(err);
         setIsLoading(false);
    }
}

    useEffect(() => {
        FetchUserSession();
    }, []);

    const handleGetReport = async () => {
      try {
        setIsLoading(true);
        const report = await axios.get(`${BACKEND_URL}/admin/report`, { withCredentials: true });
        setTotalClass(report.data.class);
        setTotalStudent(report.data.student);
        setTotalDepartment(report.data.department);
        setTotalTeacher(report.data.teacher);
        setTotalSubject(report.data.subject);
        setTotalTrade(report.data.trade);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.error(err);
      }
    }

    useEffect(() => {
      handleGetReport();
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="flex justify-between bg-cyan-400 w-full">
               <div>
                   <p>Logo</p>
               </div>
                <nav className="flex items-center justify-center h-14 w-full font-normal space-x-5 text-gray-900 text-md">
                    <Link>Dashboard</Link>
                    <Link>Students</Link>
                    <Link>Class</Link>
                    <Link>Teacher</Link>
                    <Link>Department</Link>
                    <Link>Admins</Link>
                    <Link>Attendance</Link>
                    <Link>Subject</Link>
                    <Link>Trade</Link>
                    <Link>Marks</Link>
                </nav>

                {user && (
                     <div onClick={() => setIsNameClicked(!isNameClicked)} className="font-bold">
                         {user.full_name}
                     </div> 
                )}
      
             {isNameClicked && (
                <div className="absolute right-2 top-14 bg-cyan-200 p-2 rounded-lg shadow-lg">
                     <p>Name: <span className="text-gray-900 font-bold">{user.email ? user.email : `no name`}</span></p>
                     <p>Role: <span className="text-gray-900 font-bold">{user.role ? user.role : `no role`}</span></p>
                     <p>Phone: <span className="text-gray-900 font-bold">{user.phone ? user.phone : `no phone`}</span></p>
                     <p>Location: <span className="text-gray-900 font-bold">{user.location ? user.location : `no location`}</span></p>

                  <div className="justify-between flex">
                        <button className="mt-2 bg-cyan-400 px-5 py-1 rounded-lg text-gray-900 hover:bg-cyan-500">More</button>
                        <button className="mt-2 bg-red-400 px-5 py-1 rounded-lg text-gray-900 hover:bg-red-500" onClick={handleLogout}>logout</button>
                  </div>
                </div> 
             )}

            </div>
            
            <div className="p-2">
                  <h2 className="text-2xl font-normal text-gray-800">Welcome to student management system {user?.full_name}</h2>

                  <div className="flex gap-6">
                    <div>
                       <h1 className="text-xl font-bold text-gray-800">Total students</h1>
                       <div>
                           {totalStudent}
                       </div>
                       </div>
                       
                       <div>
                       <h1>Total Teachers</h1>
                       <div>
                          {totalTeacher}
                       </div>
                    </div>
                    
                    <div>
                       <h1>Total Subjects</h1>
                       <div>
                          {totalSubject}
                       </div>
                    </div>
                    
                    <div>
                       <h1>Total Classes</h1>
                       <div>
                          {totalClass}
                       </div>
                    </div>
                    
                    <div>
                       <h1>Total Trades</h1>
                       <div>
                          {totalTrade}
                       </div>
                    </div>
                    
                    <div>
                       <h1>Total Trades</h1>
                       <div>
                          {totalDepartment}
                       </div>
                    </div>
            </div>
        </div>
        </div>
    )
}
export default DashboardPage;