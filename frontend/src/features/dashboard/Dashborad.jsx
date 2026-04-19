import { useState } from "react";
import { Link } from "react-router-dom";

const DashboardPage = () => {

    return (
        <div className="bg-gray-100 min-h-screen flex">
            <div>
            <div className="flex items-center justify-center  bg-cyan-400 h-14 w-full p-4">
                <nav className="flex space-x-5 text-gray-900 text-md">
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
            </div>
            </div>
        </div>
    )
}

export default DashboardPage;