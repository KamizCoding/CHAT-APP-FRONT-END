import React from 'react'
import Avatar from './avatar'
import { Link } from 'react-router-dom'

const UserCard = ({user, onClose}) => {
  return (
    <Link to={"/"+user?._id} onClick={onClose}className='flex items-center gap-3 p-2 lg:p-4 border border-transparent border-b-slate-300
    hover:border hover:border-primary cursor-pointer'>
      <div>
        <Avatar
          width={30}
          height={50}
          name={user?.name}
          userID={user?._id}
        />
      </div>
      <div>
        <div className='font-semibold text-ellipsis line-clamp-1'>
           {user?.name}
        </div>
        <p className='text-sm text-ellipsis line-clamp-1'>{user?.email}</p>
      </div>
    </Link>
  )
}

export default UserCard
