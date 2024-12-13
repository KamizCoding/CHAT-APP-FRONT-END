import React from 'react'
import { FaUser } from "react-icons/fa";
import { useSelector } from 'react-redux';

const Avatar = ({userID, name, width, height}) => {
  const onlineUser = useSelector(state => state?.user?.onlineUser)

  let avatarName = ""

  if (name) {
    const splitName = name?.split(" ")

    if (splitName.length > 1) {
      avatarName = splitName[0][0] + splitName[1][0]
    } else {
      avatarName = splitName[0][0]
    }
  }

  const bgColor = [
    'bg-slate-200',
    'bg-teal-200',
    'bg-red-200',
    'bg-green-200',
    'bg-blue-200'
  ]

  const randomNumber = Math.floor(Math.random() * 5)
  const isOnline = onlineUser.includes(userID)
  return (
    <div className={`text-slate-800 rounded-full font-bold relative`} 
         style={{ width: width + "px", height: height + "px" }}>
      {
        name ? (
          <div style={{ width: width + "px", height: height + "px" }} className={`overflow-hidden rounded-full flex justify-center items-center ${bgColor[randomNumber]}`}>
            {avatarName}
          </div>
        ) : (
          <FaUser size={width} />
        )
      }
        {
          isOnline && (
            <div className='bg-green-500 p-1 absolute bottom-2 -right-1 z-10 rounded-full'>

            </div>
          )
        }
    </div>
  )
}

export default Avatar
