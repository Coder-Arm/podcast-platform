import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../Components/Header'
import { signOut } from 'firebase/auth'
import { auth } from '../Firebase'
import { toast } from 'react-toastify'

const ProfilePage = () => {
  const user = useSelector(state => state.user.user)
  console.log(user)
 
  if(!user) {
    return <>
  <Header/>
  </>  
  }

  function handleLogOut(){
    signOut(auth).then(() => {
      toast.success('User logged out successfully')
    }).catch(error => {
      toast.error(error.message)
    })
  }
  return (
    <div>
      <Header/>
      <h1 className='heading' id='profile'>Profile</h1>
      <div className='profile-pic'>
      </div>
      <h1 className='heading'>Your Podcasts</h1>
      <button className='custom-btn' id='logout-btn' onClick={handleLogOut}>Logout</button>
    </div>
  )
}

export default ProfilePage
