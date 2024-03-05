import React,{useState,useRef } from 'react'
import { Button } from "keep-react";
import { Table } from "keep-react";
import Papa from 'papaparse'; // Using PapaParse library for parsing CSV
import axios from 'axios';
import { AiOutlineLoading } from "react-icons/ai";
import { ImSpinner9 } from "react-icons/im";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';



export default function Home() {

    const [csvData, setCsvData] = useState([]);
    const [csvHeaders, setCsvHeaders] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [rows,setRows] = useState(0)
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const tableRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        parseCSV(file);
        if (tableRef.current) {                                                                                                   
          tableRef.current.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
          });
      }
    };
  
        const parseCSV = (file) => {
            if (file) {
              Papa.parse(file, {
                header: true,
                complete: function(results) {
                  // Extract headers and data from the parsed CSV
                  if (results && results.meta && results.meta.fields && results.data) {
                    setCsvHeaders(results.meta.fields);
                    setRows(results.data.length-1);
                    setCsvData(results.data.slice(0, 5)); // Limit to the first five rows
                  }
                }
              });
            }
          };

    const handleFileUpload = () => {
        setLoading(true);
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
      
            axios.post("http://localhost:5000/upload_file", formData)
              .then(response => {
                console.log('File uploaded successfully:', response.data);
                setLoading(false);
                navigate('/result');
                // Handle response from backend if needed
              })
              .catch(error => {
                console.error('Error uploading file:', error);
                // Handle error if needed
              });
          }
    }
  return (
    <div className='p-8'>
        <h1 className='text-2xl py-4 font-semibold'>Upload the CSV File</h1>
        <input className='' type="file" accept=".csv" onChange={handleFileChange} />
        <div>
        {csvHeaders.length > 0 && csvData.length > 0 && (
        <div>
            <div className='flex justify-end px-2'>
              {loading ? (<div><FaSpinner /></div>) : ( <button className='bg-[#07244b] text-white rounded' onClick={handleFileUpload}><div className='m-3'>Process</div></button>)}
           
          </div>
          <div className='max-h-screen overflow-y-auto' ref={tableRef}> {/* Set max height and overflow */}
            <Table className='table-auto w-full'>               
                 <Table.Caption className='text-left px-2 text-2xl font-semibold'>
                    CSV File Uploaded
                </Table.Caption>

                <Table.Head>
                    {csvHeaders.map((header, index) => (
                        <Table.HeadCell key={index}>{header}</Table.HeadCell>
                    ))}
                    {/* <Table.HeadCell className="min-w-[344px]">
                    <p className="text-body-6 font-medium text-metal-400">File no.</p>
                    </Table.HeadCell>
                    <Table.HeadCell className="min-w-[160px]">File size</Table.HeadCell>
                    <Table.HeadCell className="min-w-[171px]">Date uploaded</Table.HeadCell>
                    <Table.HeadCell className="min-w-[170px]">Last uploaded</Table.HeadCell>
                    <Table.HeadCell className="min-w-[300px]">Team</Table.HeadCell>
                    <Table.HeadCell className="min-w-[100px]" /> */}
                </Table.Head>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>

                        </Table.Cell>
                    </Table.Row>
                    {csvData.map((row, rowIndex) => (
                    <Table.Row key={rowIndex}>
                    {csvHeaders.map((header, colIndex) => (

                      <Table.Cell className='' key={colIndex}>{row[header]}</Table.Cell>
                    ))}
                    </Table.Row>
                ))}
                </Table.Body>
            {/* <table className="table-auto w-full border">
              <thead className='border-solid'>
                <tr className='justify-start'>
                  {csvHeaders.map((header, index) => (
                    <th className='text-left' key={index}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody className='border'>
                
              </tbody>
            </table> */}
            </Table>
          </div>
          <br />
            <div className='text-2xl px-4'>
                Number of rows in the selected CSV file : {rows}
            </div>
            <br />
            <div className='text-2xl px-4'>
                Number of columns in the selected CSV file : {csvHeaders.length}
            </div>
        </div>
        
      )}
     
      </div>
    </div>
  )
}
