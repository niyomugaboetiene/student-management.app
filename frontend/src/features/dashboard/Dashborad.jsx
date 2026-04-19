import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaAlignLeft } from "react-icons/fa";

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isNameClicked, setIsNameClicked] = useState(false);

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

    useEffect(() => {
        FetchUserSession();
    }, []);

    return (
        <div className="bg-gray-100 flex">
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
                     <div onClick={() => setIsNameClicked(!isNameClicked)}>
                         {user.full_name}
                     </div> 
                )}
      
             {isNameClicked && (
                <div className="absolute right-2 top-14 bg-cyan-200 p-2 rounded-lg shadow-lg">
                     <p>Name: <span className="text-gray-900 font-bold">{user.email}</span></p>
                     <p>Role: <span className="text-gray-900 font-bold">{user.role}</span></p>
                     <p>Phone: <span className="text-gray-900 font-bold">{user.phone}</span></p>
                     <p>Location: <span className="text-gray-900 font-bold">{user.location}</span></p>

                     <button className="mt-2 bg-cyan-400 px-5 rounded-lg text-gray-900 hover:bg-cyan-500">More</button>
                </div> 
             )}
            </div>
        </div>
    )
}
export default DashboardPage;