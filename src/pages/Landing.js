import React from 'react'
import Typewriter from '../components/Typewriter'
import Bg from '../images/Bg.png'
import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate();


  const handleopenbatchfile = () =>{

  }
  return (
    <div>
    <div className='flex justify-between'>
        <div className='text-center text-3xl font-bold m-auto text-[#07244b]'>
        An explainable Machine Learning System to detect<br />
          <Typewriter text="Exploitation Based DDoS and Reflection Based DDoS Attacks" speed={100} />
        </div>
        <img src={Bg} alt="background" className='max-w-full h-auto z-0'/>
      </div>
      <button className='bg-[#07244b] text-white mx-24 rounded' onClick={()=>{navigate('/home')}}>
        <div className='m-3 font-bold'>
        Upload CSV
        </div>
      </button>
      <br />
      <br />
      <button className='bg-[#07244b] text-white mx-24 rounded' onClick={handleopenbatchfile}>
        <div className='m-3 font-bold'>
        Open CICFlowmeter Batch File
        </div>
      </button>
    </div>
  )
}
