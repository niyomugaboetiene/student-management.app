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

  const [montlyStudent, setMothlyStudent] = useState(null);

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
    
    const handleGetMonthlyStudent = async () => {
      try {
        setIsLoading(true);
        const student = await axios.get(`${BACKEND_URL}/admin/auth/monthlyStudents`, { withCredentials: true });
        console.log("Student data", student.data.student);
        setMothlyStudent(student.data.student);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.error(err);
      }
    }

    useEffect(() => {
      handleGetMonthlyStudent();
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="flex justify-between bg-cyan-400 w-full">
                {isLoading && (
                    <div className="flex justify-center items-center">
                        <div className="h-8 w-8 text-cyan-500 border-transparent animate-spin"></div>
                    </div>
                )}
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
            
            <div className="p-2 mt-4 ms-3">
                  <h2 className="text-2xl font-normal text-gray-800">Welcome to student management system {user?.full_name}</h2>

                  <div className="flex gap-6">
                    <div className="mt-3">
                       <h1 className="text-xl font-bold text-gray-800">Total students</h1>
                       <div 
                       title="CLick to view list"
                          className="bg-white p-3 flex justify-center ms-4 w-24 mt-2 font-bold rounded-lg shadow-xl hover:scale-110 transition duration-200"
                          onClick={() => navigate('/student/list')}
                        >
                           {totalStudent}
                       </div>
                       </div>
                       
                       <div className="mt-3">
                       <h1 className="text-xl font-bold text-gray-800">Total Teachers</h1>
                       <div 
                       title="CLick to view list"
                          className="bg-white p-3 flex justify-center ms-4 w-24 mt-2 font-bold rounded-lg shadow-xl hover:scale-110 transition duration-200"
                          // onClick={() => navigate('/teacher/list')}
                          >
                          {totalTeacher}
                       </div>
                    </div>
                    
                    <div className="mt-3">
                       <h1 className="text-xl font-bold text-gray-800">Total Subjects</h1>
                       <div 
                       title="CLick to view list"
                         className="bg-white p-3 flex justify-center ms-4 w-24 mt-2 font-bold rounded-lg shadow-xl hover:scale-110 transition duration-200"
                         onClick={() => navigate('/subject/list')}
                        >
                          {totalSubject}
                       </div>
                    </div>
                    
                    <div className="mt-3">
                       <h1 className="text-xl font-bold text-gray-800">Total Classes</h1>
                       <div 
                       title="CLick to view list"
                          className="bg-white p-3 flex justify-center ms-4 w-24 mt-2 font-bold rounded-lg shadow-xl hover:scale-110 transition duration-200"
                          onClick={() => navigate('/class/list')}
                        >
                          {totalClass}
                       </div>
                    </div>
                    
                    <div className="mt-3">
                       <h1 className="text-xl font-bold text-gray-800">Total Trades</h1>
                       <div 
                       title="CLick to view list"
                         className="bg-white p-3 flex justify-center ms-4 w-24 mt-2 font-bold rounded-lg shadow-xl hover:scale-110 transition duration-200"
                         onClick={() => navigate('/trade/list')}
                        >
                          {totalTrade}
                       </div>
                    </div>
                    
                    <div className="mt-3">
                       <h1 className="text-xl font-bold text-gray-800">Total Departments</h1>
                       <div 
                       title="CLick to view list"
                         className="bg-white p-3 flex justify-center ms-10 w-24 mt-2 font-bold rounded-lg shadow-xl hover:scale-110 transition duration-200"
                         onClick={() => navigate('/department/list')}
                        >
                          {totalDepartment}
                       </div>
                    </div>
            </div>
           {montlyStudent ? (
             <div className="mt-12 text-2xl">
               <h2 className="font-bold text-cyan-600 mb-4">Monthly Student</h2>

               <div className="flex max-w-9xl">
                  <table border={2} className="overflow-hidden overflow-x-auto">
                     <thead className="bg-cyan-400 text-white">

                        <tr>
                           <th className="py-2 px-24">Id</th>
                           <th className="py-1 px-2">Full name</th>
                           <th className="py-1 px-2">Gender</th>
                           <th className="py-1 px-2">Email</th>
                           <th className="py-1 px-2">Trade</th>
                           <th className="py-1 px-2">Phone</th>
                           <th className="py-1 px-2">Location</th>
                           <th className="py-1 px-2">CLass</th>
                           <th className="py-1 px-2">Status</th>
                           <th className="py-1 px-2">Joined at</th>
                           <th className="py-1 px-2">Role</th>
                        </tr>
                     </thead>

                     <tbody>
                        {montlyStudent?.map((student, index) => (
                           <tr key={index}>
                              <td>{student.student_id}</td>
                              <td>{student.full_name}</td>
                              <td>{student.gender}</td>
                              <td>{student.email}</td>
                              <td>{student.trade?.trade_name}</td>
                              <td>{student.phone}</td>
                              <td>{student.location}</td>
                              <td>{student.class?.class_name}</td>
                              <td>{student.is_approved}</td>
                              <td>{new Date(student.createdAt).toLocaleDateString()}</td>
                              <td>{student.role}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
           ) : (
            <div>
               <p>No students added in this month</p>
            </div>
           )}
        </div>
        </div>
    )
}
export default DashboardPage;