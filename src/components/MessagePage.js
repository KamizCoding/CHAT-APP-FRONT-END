import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Avatar from './avatar'
import { MdArrowBackIos } from "react-icons/md";
import backgroundImage from '../assets/wallpaper.jpg'
import { IoSend } from "react-icons/io5";
import moment from 'moment'

const MessagePage = () => {
  const params = useParams()
  const socketConnection = useSelector(state => state?.user?.socketConnection)
  const user = useSelector(state => state?.user)
  const [datauser,setDataUser] = useState({
    _id : "",
    name : "",
    email : "",
    online : false,
  })

  const [message, setMessage] = useState({
    text : ""
  })
  console.log("params",params.userId)
  
  const[allMessage,setAllMessage] = useState([])
  const currentMessage = useRef(null)

  useEffect(()=>{
    if(currentMessage.current){
      currentMessage.current.scrollIntoView({behavior : 'smooth', block : 'end'})
    }
  },[allMessage])

  useEffect(()=>{
    if(socketConnection){
      socketConnection.emit('message-page',params.userId)

      socketConnection.emit('seen',params.userId)

      socketConnection.on('message-user',(data)=>{
        setDataUser(data)
      })

      socketConnection.on('message',(data)=>{
        console.log('message data', data)
        setAllMessage(data)
      })


    }
  },[socketConnection,params?.userId,user])

  const handleOnChange = (e)=>{
    const {name, value} = e.target

    setMessage(preve =>{
      return{
        ...preve,
        text : value
      }
    })
  }

  const handleSendMessage = (e)=>{
    e.preventDefault()

    if(message.text){
      if(socketConnection){
        socketConnection.emit('new message',{
          sender : user?._id,
          receiver : params.userId,
          text : message.text,
          msgByUserId : user?._id
        })
        setMessage(
          {
            text : ""
          }
        )
      }
    }
  }

  return (
    <div style={{ background : `url(${backgroundImage})`}}>
      <header className='sticky top-0 h-16 bg-white'>
          <div className='flex items-center gap-2'>
            <Link to={"/"} className='lg:hidden ml-5'>
              <MdArrowBackIos
                  size={26}
              />
            </Link>
            <div className='mt-2'>
              <Avatar
                width={50}
                height={50}
                name={datauser?.name}
                userID={datauser?._id}
              />
            </div>
            <div>
              <div>
                <h3 className='font-semibold text-lg my-0'>{datauser?.name}</h3>
                <p className='-my-2 text-sm'>
                  {
                    datauser.online ? <span className='text-green-500'>Online</span> : <span className='text-red-500'>Offline</span>
                  }
                </p>
              </div>
            </div>
          </div>
      </header>
      {/**Show all messages*/}
      <section className='h-[calc(100vh-128px)] overflow-x-hidden overflow-y-scroll scrollbar'>
        {/**Show Messages*/}
        <div className='flex flex-col gap-2 py-2 mx-2' ref={currentMessage}>
          {
            allMessage.map((msg,index)=>{
              return(
                <div className={` p-1 py-1 rounded w-fit ${user._id === msg.msgByUserId ? "ml-auto bg-teal-100" : "bg-white"}`}>
                  <p className='px-2'>{msg.text}</p>
                  <p className='text-xs ml-auto w-fit'>{moment(msg.createdAt).format('hh:mm')}</p>
                </div>
              )
            })
          }
        </div>
      </section>

      {/**Send new messages*/}
      <section className='h-16 bg-white flex items-center px-4'>
          <form className='h-full w-full flex gap-2'onSubmit={handleSendMessage}>
              <input
                  type='text'
                  placeholder='Enter your message'
                  className='py-1 px-4 outline-none w-full h-full'
                  value={message.text}
                  onChange={handleOnChange}
              />
              <button className='text-primary hover:text-secondary'>
                <IoSend
                  size={30}
                />
              </button>
          </form>
      </section>
    </div>
  )
}

export default MessagePage
