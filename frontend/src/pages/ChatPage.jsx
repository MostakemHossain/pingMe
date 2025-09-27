/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthState } from '../store/useAuthStore'
import Loading from '../components/Loading';

const ChatPage = () => {
  const { logout} = useAuthState();


  return <div>
    hello
  </div>
}

export default ChatPage;
