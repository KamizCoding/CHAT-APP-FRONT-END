import React, { useEffect, useState } from 'react'
import { IoChatboxEllipses } from "react-icons/io5";
import { FiUserPlus } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import { NavLink, useNavigate } from 'react-router-dom';
import Avatar from './avatar'
import { useDispatch, useSelector } from 'react-redux';
import EditUserDetails from './EditUserDetails';
import { GoArrowUpLeft } from "react-icons/go";
import SearchUser from './SearchUser';
import { logout } from '../redux/userSlice';

const Sidebar = () => {
    const user = useSelector(state => state?.user)
    const [editUserOpen,setEditUserOpen] = useState(false)
    const[allUser,setAllUser] = useState([])
    const[openSearchUser,setOpenSearchUser] = useState(false)
    const socketConnection = useSelector(state => state?.user?.socketConnection)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        if(socketConnection){
            socketConnection.emit('sidebar', user._id)

            socketConnection.on('conversation', (data)=>{
                console.log('conversation',data)

                const conversationUserData = data.map((conversationUser,index)=>{

                    if(conversationUser?.sender?._id === conversationUser?.receiver?._id){
                        return{
                            ...conversationUser,
                            userDetails : conversationUser.sender
                        }
                    }

                    else if (conversationUser?.receiver?._id !== user?._id){
                        return{
                            ...conversationUser,
                            userDetails : conversationUser.receiver
                        }
                    }else{
                        return{
                            ...conversationUser,
                            userDetails : conversationUser.sender
                        }
                    }
                    
                })
                setAllUser(conversationUserData)
            })
        }
    },[socketConnection, user])

    const handleLogout = ()=>{
        dispatch(logout())
        navigate("/email")
        localStorage.clear()
    }

  return (
    <div className='w-full h-full grid grid-cols-[48px,1fr] bg-white'>
      <div className='bg-slate-400 w-12 h-full rounded-tr-lg rounded-br-lg py-4 text-slate-700 
      flex flex-col justify-between'>
            <div>
                <NavLink className={({isActive})=>`w-12 h-12 bg-blue-100 flex justify-center 
                items-center cursor-pointer
                hover:bg-blue-400 ${isActive && "bg-slate-500"}`} title='Chat'>
                    <IoChatboxEllipses
                        size={30}
                    /> 
                </NavLink>

                <div className='w-12 h-12 bg-blue-100 flex justify-center items-center cursor-pointer
                hover:bg-blue-400' title='Add New Friend' onClick={()=>setOpenSearchUser(true)}>
                    <FiUserPlus
                        size={27}
                    />
                </div>
            </div>

        <div className='flex flex-col items-center'>
            <button className='mx-auto' title={user?.name} onClick={()=>setEditUserOpen(true)}>
                <Avatar
                    width={38}
                    height={38}
                    name={user?.name}
                    userID={user?._id}
                />
            </button>
            <button className='w-12 h-12 bg-blue-100 flex justify-center items-center cursor-pointer
                hover:bg-blue-400' title='Logout' onClick={handleLogout}>
                <span className='-ml-2'>
                    <BiLogOut
                        size={26}
                    />
                </span>
             </button>
        </div>
      </div>

      <div className='w-full'>
        <div className='h-17 flex items-center'>
             <h2 className='text-xl font-bold p-4'>Messages</h2>
        </div>
        <div className='p-[0.5px] bg-slate-100 my-1'>

        <div className='h-[calc(100vh-69px)] overflow-x-hidden overflow-y-auto scrollbar'>
            {
                allUser.length === 0 && (
                    <div className='mt-12'> 
                        <div className='flex justify-center items-center my3 text-primary'>
                            <GoArrowUpLeft
                                size={50}
                            />
                        </div>
                        <p className='text-lg text-center text-secondary'>
                            Explore users to start texting
                        </p>
                    </div>
                )
            }

            {
                allUser.map((conv,index)=>{
                    return(
                        <NavLink to={"/" + conv?.userDetails?._id}key={conv?._id} className='flex items-center gap-2 p-3 border border-transparent hover:bg-slate-400 cursor-pointer'>
                            <div>
                                <Avatar
                                    name={conv?.userDetails?.name}
                                    width={40}
                                    height={40}
                                />
                            </div>
                            <div>
                                <h3 className='text-ellipsis line-clamp-1 font-semibold'>{conv?.userDetails?.name}</h3>
                                <div>
                                    <p className='text-ellipsis line-clamp-1 text-sm text-slate-400'>{conv.lastMsg.text}</p>
                                </div>
                            </div>
                            {
                                Boolean(conv?.unseenMsg)&& (
                                    <p className='text-xs text-center ml-auto p-1 bg-primary text-white font-semibold rounded-full w-6 h-6'>{conv?.unseenMsg}</p>
                                )
                            }                           
                        </NavLink>
                    )
                })
            }
        </div>
      </div>
    
      </div>

      {/**Edit User Details*/}
      {
        editUserOpen && (
            <EditUserDetails onClose={()=>setEditUserOpen(false)} user={user}/>
        )
      }

      {/**Search New User*/}
      {
        openSearchUser && (
            <SearchUser onClose={()=>setOpenSearchUser(false)}/>
        )
      }
    </div>
  )
}

export default Sidebar
