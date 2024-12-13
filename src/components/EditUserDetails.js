import React, { useEffect, useState } from 'react'
import Avatar from './avatar'
import Divider from './divider'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/userSlice'

const EditUserDetails = ({onClose,user}) => {
    const [data,setData] = useState({
        name : user?.user
    })

    const dispatch = useDispatch()

    useEffect(()=>{
        setData((preve)=>{
            return{
                ...preve,
                ...user
            }

        })
    },[user])

    const handleOnChange = (e)=>{
        const {name,value} = e.target

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

        try {
            const URL = `${process.env.REACT_APP_BACKEND_URL}/api/update-user`
            const response = await axios({
                method : 'post',
                url : URL,
                data : data,
                withCredentials : true
            })

            toast.success(response?.data?.message)

            if(response.data.success){
                 dispatch(setUser(response.data.data))
                 onClose()
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex 
    justify-center items-center z-10'>
      <div className='bg-white p-4 py-6 m-1 rounded w-full max-w-sm '>
        <h2 className='font-semibold '>Profile Details</h2>
        <p className='text-sm'>Edit User Details</p>

        <form className='grid gap-3 mt-3' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-1'>
                <label htmlFor='name'>Name : </label>
                <input
                    type='text' name='name' id='name' value={data.name} onChange={handleOnChange}
                    className='w-full py-1 px-2 focus:outline-primary border-0.5'
                />
            </div>

            <div className='my-1'>
                <label htmlFor='profile'>Profile</label>
                <div>
                    <Avatar
                    width={40}
                    height={40}
                    name={data?.name}
                    />
                </div>
            </div>

            <Divider/>
            <div className='flex gap-2 w-fit ml-auto'>
                <button onClick={onClose} className='border-primary border text-primary px-4 py-1 hover:bg-primary hover:text-white'>Cancel</button>
                <button onClick={handleSubmit} className='border-primary bg-primary text-white border px-4 py-1 hover:bg-secondary hover:text-primary'>Save</button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default React.memo(EditUserDetails)
