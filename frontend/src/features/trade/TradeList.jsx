import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";

const GetTradeList = () => {
    const [trade, setTrade] = useState(null);
    const [isLoading, setIsLoading] = useState("");
    const [error, setError] = useState("");
    const [DepartmentId, setDepartmentId] = useState("");

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const handleGetTrade = async () => {
          try {
            setIsLoading(true);
            const tradeRes = await axios.get(`${BACKEND_URL}/trade/tradeList`, { withCredentials: true });
            setTrade(tradeRes.data.Trade);
            const TradeData = tradeRes.data.Trade;
            setDepartmentId(TradeData.department);
            console.log("Trade Id", TradeData);
            setIsLoading(false);
          } catch (err) {
            console.error(err);
            const errorMessage = err.response?.data?.message;
            if (errorMessage === "No trade in the system") {
                setError("No trade in the system");
            }

            if (errorMessage === "Internal server error") {
                setError(errorMessage);
            }

            setIsLoading(false);
          }
    }
    
    const handleGetDepartmentById = async () => {
          try {
            setIsLoading(true);
            const depRes = await axios.get(`${BACKEND_URL}/department/${DepartmentId}`, { withCredentials: true });

            setIsLoading(false);
          } catch (err) {
            console.error(err);
            const errorMessage = err.response?.data?.message;
            if (errorMessage === "No department im the system") {
                setError(errorMessage);
            }

            if (errorMessage === "Server error") {
                setError(errorMessage);
            }

            setIsLoading(false);
          }
    }

    useEffect(() => {
        handleGetTrade();
    }, []);

    useEffect(() => {
           handleGetDepartmentById();
    }, [DepartmentId]);

    return (
        <div className="bg-cyan-100 min-h-screen p-3">
            <div className="flex items-center justify-center mt-3 p-5">
                <table className="border border-cyan-500 shadow-lg">
                       <tbody className="bg-cyan-200 text-gray-800 ">
                         <tr className="border">
                           <th className="border-r">Id</th>
                           <th className="border-r">Name</th>
                           <th className="border-r">Code</th>
                           <th className="border-r">Department</th>
                           <th className="border-r" colSpan={2}>Operation</th>
                          </tr>
                       </tbody>

                       <tbody>
                    {trade?.map((tra) => (
                        <tr key={tra._id} className="hover:bg-cyan-200">
                            <td className="border-r">{tra.trade_id}</td>
                            <td className="border-r">{tra.trade_name}</td>
                            <td className="border-r">{tra.code}</td>
                            <td className="border-r">{tra.department}</td>

                            <div className="p-3 flex space-x-4">
                            <Link className="py-1 px-3 bg-green-400 hover:bg-green-500 transition-colors text-white font-bold rounded-lg" to={`/trade/update/${tra._id}`}><FaEdit className=""/> Update</Link> 
                            <Link className="py-1 px-3 bg-red-500 hover:bg-red-400 transition-colors text-white font-bold rounded-lg" to={`/trade/delete/${tra._id}`}><FaTrash /> Delete</Link>
                        </div>

                        </tr>
                    ))}
                       </tbody>
                </table>
            </div>
        </div>
    );
}

export default GetTradeList;