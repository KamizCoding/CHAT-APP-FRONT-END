import React, { useEffect, useState } from 'react'
import { FaSearchPlus } from "react-icons/fa";
import Loading from './Loading';
import UserCard from './UserCard';
import toast from 'react-hot-toast'
import axios from 'axios';
import { AiFillCloseSquare } from "react-icons/ai";

const SearchUser = ({onClose}) => {
    const [searchUser, setSearchUser] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")

    const handleSearchUser = async()=>{
        const URL = `${process.env.REACT_APP_BACKEND_URL}/api/search-user`
        try {
            setLoading(true)
            const response = await axios.post(URL,{
                search : search
            })
            setLoading(false)

            setSearchUser(response.data.data)
                
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    useEffect(()=>{
        handleSearchUser()
    },[search])

    console.log("searchUser",searchUser)

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-slate-700 bg-opacity-40 p-3 z-10'>
      <div className='w-full max-w-lg mx-auto mt-8'>
            {/**Input Search User*/}
            <div className='bg-white rounded h-9 overflow-hidden flex'>
                <input type='text' placeholder='Plaese Enter Valid Email Address of Registered User'
                className='w-full outline-none py-1 h-full px-2' onChange={(e)=>setSearch(e.target.value)}
                value={search}
                />
                <div className='h-10 w-14 flex justify-center items-center'>
                    <FaSearchPlus
                        size={20}
                    />
                </div>
            </div>

            {/**Display Search User*/}      
            <div className='bg-white mt-2 w-full p-4 rounded'>
                {/**No User Found*/}
                {
                    searchUser.length === 0 && !loading && (
                        <p className='text-center text-slate-400'> No User are Available!! </p>
                    )
                }  

                {
                    loading && (
                        <p className='text-center text-slate-400'> <Loading/> </p>
                    )
                }

                {
                    searchUser.length !==0 && !loading && (
                    searchUser.map((user, index) => {   
                        return (
                          <UserCard key={user._id} user={user} onClose={onClose}/>
                        )
                      })
                    )
                }
            </div>
            </div>
            <div className='absolute top-0 right-0 text-4xl p-2 hover:text-primary' onClick={onClose}>
                <button>
                    <AiFillCloseSquare
                        
                    />
                </button>
            </div>
      
    </div>
  )
}

export default SearchUser
