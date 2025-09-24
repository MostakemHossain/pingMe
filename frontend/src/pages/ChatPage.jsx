import React from 'react'
import { useAuthState } from '../store/useAuthStore'

const ChatPage = () => {
    const {authUser}= useAuthState();
    console.log(authUser)
  return (
    <div>ChatPage</div>
  )
}

export default ChatPage