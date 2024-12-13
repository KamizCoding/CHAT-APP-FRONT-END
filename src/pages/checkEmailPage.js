import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { FaUser } from "react-icons/fa";

const CheckEmailPage = () => { 
  const [data,setData] = useState({
  email : ""
})

const navigate = useNavigate()

const handleOnChange = (e)=>{
  const {name, value} = e.target

  setData((preve)=>{
    return{
        ...preve,
        [name] : value
    }
  })
}

const handleSubmit = async (e)=>{
  e.preventDefault()
  e.stopPropagation()
  
  const URL = `${process.env.REACT_APP_BACKEND_URL}/api/email`

  try {
    const response = await axios.post(URL,data)
    console.log("response",response)

    toast.success(response?.data?.message)

    if(response.data.success){
      setData({
        email : ""
      })

      navigate('/password',{
        state : response?.data?.data
      })
    }
  } catch (error) {
    toast.error(error?.response?.data?.message)
  }
}
  return (
    <div className='mt-5'>
      <div className='bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto'>

        <div className='w-fit mx-auto mb-4'>
          <FaUser size={74}/>
        </div>
        <h3>
          Welcome to Pro Chat
        </h3>

        <form className='grid gap-5 mt-4'onSubmit={handleSubmit}>
          <div className='flex flex-col gap-2'>
            <label htmlFor='email'>Your Email : </label>
            <input type='email' id='email' name='email' placeholder='Enter Your Email Here' 
            className='bg-slate-100 px-2 py-1 focus:outline-primary' value={data.email} 
            onChange={handleOnChange} required></input>
          </div>

          <button className='bg-primary text-lg px-5 py-2 hover:bg-secondary rounded mt-4 font-bold text-white'>
            Start Chatting
          </button>
        </form>

    <p className='my-2 text-center'>New User  <Link to ={"/register"} className='hover:text-primary hover:underline font-semibold'>Register</Link></p>

      </div>
    </div>
  )
}

export default CheckEmailPage
