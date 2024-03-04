import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PieChart from '../components/PieChart';

import { Pagination } from "keep-react"; // Assuming you have a Pagination component



export default function Results() {
    const [values, setValues] = useState([]);
    const [count,setCount] = useState([{
        value:0
    },{
        value:0
    }]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/get_predicted_values");
                if (response.data.success) {
                    setValues(response.data.predicted);
                    const counts = {0:0,1:0};
  
                    response.data.predicted.forEach(element => {
                      if (counts[element]) {
                        counts[element]++;
                      } else {
                        counts[element] = 1;
                      }
                    });
                    setCount([
                        { label: 'Attack', value: counts[1] },
                        { label: 'Benign', value: counts[0]}
                    ])
                    console.log("Data fetched successfully");
                } else {
                    console.error("Failed to fetch data:", response.data.message);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // return (
    //     <div className='flex'>
    //     {/* <div className='v-screen w-1/2 h-1/2 overflow-y-auto'>
    //             <table className="table w-full">
    //                 <thead>
    //                     <tr>
    //                         <th className="border px-4 py-2">S No.</th>
    //                         <th className="border px-4 py-2">Result Detected</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody className="divide-y divide-gray-200">
    //                     {values.map((value, index) => (
    //                         <tr key={index}>
    //                             <td className="border px-4 py-2">{index + 1}</td>
    //                             <td className="border px-4 py-2">{value}</td>
    //                         </tr>
    //                     ))}
    //                 </tbody>
    //             </table>
    //     </div> */}
    // <div className="h-screen/2 h-1/2 overflow-y-scroll">
    //   <table className="min-w-full divide-y divide-gray-200">
    //     <thead className="bg-gray-50">
    //       <tr>
    //         <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //           S No.
    //         </th>
    //         <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //           Result Detected
    //         </th>
    //         {/* Add more header columns as needed */}
    //       </tr>
    //     </thead>
    //     <tbody className="divide-y divide-gray-200">
    //                     {values.map((value, index) => (
    //                         <tr key={index}>
    //                             <td className="border px-4 py-2">{index + 1}</td>
    //                             <td className="border px-4 py-2">{value}</td>
    //                         </tr>
    //                     ))}
    //                 </tbody>
    //   </table>
    // </div>
    //     <PieChart data={count} />
    // </div>
    
    // );
     // Sample data for the table
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Pagination logic
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentData = values.slice(lastIndex-itemsPerPage, lastIndex);
  
  return (
    <div className='w-3/4'>
        <h1 className='text-2xl font-semibold p-8'>Results</h1>
        <br />

    <div className="flex px-8 justify-between">
        <div>
      <table className="w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">S No.</th>
            <th className='px-4 py-2'>Result Detected</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item,index) => (
            <tr key={index}>
                <td className='border px-4 py-2'>{firstIndex+index+1}</td>
              <td className="border px-4 py-2">{item}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <Pagination
        currentPage={currentPage}
        onPageChange={(val) => setCurrentPage(val)}
        totalPages={Math.ceil(values.length / itemsPerPage)}
        iconWithText={true}
        prevNextShape="roundSquare"
      />
      </div>
      <table className="border h-1/2 items-center">
        <thead>
            <th className='px-4 py-2'>Type</th>
            <th className='px-4 py-2'>Count</th>
        </thead>
      <tbody>
        <tr>
          <td className='border px-4 py-2'>Attack</td>
          <td className='border px-4 py-2'>{count[0].value}</td>
        </tr>
        <tr>
          <td className='border px-4 py-2'>Benign</td>
          <td className='border px-4 py-2'>{count[1].value}</td>
        </tr>
      </tbody>
    </table>
    <div>
         <PieChart data={count} />
    </div>
    </div>
    </div>
  );
}
