import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { FaUser } from "react-icons/fa";
import Avatar from '../components/avatar';
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/userSlice';

const CheckPasswordPage = () => { 
  const [data,setData] = useState({
  password : ""
})

const navigate = useNavigate()
const location = useLocation()
const dispatch = useDispatch()

console.log("location", location.state)

useEffect(()=>{
  if(!location?.state?.name){
    navigate('/email')
  }
},[])

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
  
  const URL = `${process.env.REACT_APP_BACKEND_URL}/api/password`

  try {
    const response = await axios({
      method : 'post',
      url : URL,
      data : {
        userId : location?.state?._id,
        password : data.password
      },
      withCredentials : true
    })

    toast.success(response?.data?.message)

    if(response.data.success){
      dispatch(setToken(response?.data?.token))
      localStorage.setItem('token',response?.data?.token)
      setData({
        password : ""
      })

      navigate('/')
    }
  } catch (error) {
    toast.error(error?.response?.data?.message)
  }
}
  return (
    <div className='mt-5'>
      <div className='bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto'>

        <div className='w-fit mx-auto mb-4 flex justify-center items-center flex-col'>
          {/*<FaUser size={74}/>*/}
          <Avatar
          width={74}
          height={74}
          name={location?.state?.name}
          />
          <h2 className='font-semibold text-left mt-2'>
            {location?.state?.name}
          </h2>
        </div>
        <h3>
          Welcome to Pro Chat
        </h3>

        <form className='grid gap-5 mt-4'onSubmit={handleSubmit}>
          <div className='flex flex-col gap-2'>
            <label htmlFor='password'>Your Password : </label>
            <input type='password' id='password' name='password' placeholder='Enter Your Password Here' 
            className='bg-slate-100 px-2 py-1 focus:outline-primary' value={data.password} 
            onChange={handleOnChange} required></input>
          </div>

          <button className='bg-primary text-lg px-5 py-2 hover:bg-secondary rounded mt-4 font-bold text-white'>
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default CheckPasswordPage
