import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const RegisterPage = () => {
  const [data,setData] = useState({
    name : "",
    email : "",
    password : ""
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
    
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/register`

    try {
      const response = await axios.post(URL,data)
      console.log("response",response)

      toast.success(response?.data?.message)

      if(response.data.success){
        setData({
          name : "",
          email : "",
          password : ""
        })

        navigate('/email')
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }

    console.log("data",data)
  }

  return (
    <div className='mt-5'>
      <div className='bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto'>
        <h3>
          Welcome to Pro Chat
        </h3>

        <form className='grid gap-5 mt-4'onSubmit={handleSubmit}>
          <div className='flex flex-col gap-2'>
            <label htmlFor='name'>Your Name : </label>
            <input type='text' id='name' name='name' placeholder='Enter Your Name Here' 
            className='bg-slate-100 px-2 py-1 focus:outline-primary' value={data.name} 
            onChange={handleOnChange} required></input>
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor='email'>Your Email : </label>
            <input type='email' id='email' name='email' placeholder='Enter Your Email Here' 
            className='bg-slate-100 px-2 py-1 focus:outline-primary' value={data.email} 
            onChange={handleOnChange} required></input>
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor='password'>Your Password : </label>
            <input type='password' id='password' name='password' placeholder='Enter Your Password Here' 
            className='bg-slate-100 px-2 py-1 focus:outline-primary' value={data.password} 
            onChange={handleOnChange} required></input>
          </div>

          <button className='bg-primary text-lg px-5 py-2 hover:bg-secondary rounded mt-4 font-bold text-white'>
            Register
          </button>
        </form>

    <p className='my-2 text-center'>Already Registered? <Link to ={"/email"} className='hover:text-primary hover:underline font-semibold'>Login</Link></p>

      </div>
    </div>
  )
}

export default RegisterPage
