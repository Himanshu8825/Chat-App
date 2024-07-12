import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {

  const userInfo = useSelector((state)=>state.auth.userInfo);
  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5">
    <h1 className="text-3xl font-bold mb-4">Profile</h1>
    <div className="mb-2">
      <strong>Email:</strong> {userInfo.email}
    </div>
    {/* Add more user details here as needed */}
  </div>
  )
}

export default Profile
