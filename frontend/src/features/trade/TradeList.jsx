import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";

const GetTradeList = () => {
    const [trade, setTrade] = useState(null);
    const [isLoading, setIsLoading] = useState("");
    const [error, setError] = useState("");

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const handleGetTrade = async () => {
          try {
            setIsLoading(true);
            const tradeRes = await axios.get(`${BACKEND_URL}/trade/tradeList`, { withCredentials: true });
            setTrade(tradeRes.data.Trade);
            // console.log("Trade", tradeRes.data.Trade);
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
    


    useEffect(() => {
        handleGetTrade();
    }, []);

    return (
        <div className="bg-cyan-50 min-h-screen p-3">
            <div className="max-w-6xl mx-auto">

                <h1 className="text-2xl font-bold text-cyan-700 mb-4 text-center">Trade List</h1>
                <div className="overflow-x-auto rounded-xl overflow-hidden border-cyan-300">
                  <table className="min-w-full border border-cyan-300 rounded-xl overflow-hidden">

                       <thead className="bg-cyan-500 text-white">
                         <tr>
                           <th className="px-3 py-2 text-left">Id</th>
                           <th className="px-3 py-2 text-left">Name</th>
                           <th className="px-3 py-2 text-left">Code</th>
                           <th className="px-3 py-2 text-left">Department</th>
                           <th className="px-3 py-2 text-left" colSpan={2}>Operation</th>
                          </tr>
                       </thead>

                       <tbody>
                    {trade?.map((tra) => (
                        <tr key={tra._id} className="">
                            <td className="">{tra.trade_id}</td>
                            <td className="">{tra.trade_name}</td>
                            <td className="">{tra.code}</td>
                            <td className="">{tra.department[0]?.name}</td>

                            <td>
                                <Link className="" to={`/trade/update/${tra._id}`}><FaEdit className=""/> Update</Link> 
                                <Link className="" to={`/trade/delete/${tra._id}`}><FaTrash /> Delete</Link>
                            </td>

                        </tr>
                    ))}
                       </tbody>
                   </table>
                </div>
            </div>
        </div>
    );
}

export default GetTradeList;