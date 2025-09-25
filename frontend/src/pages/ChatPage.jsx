/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthState } from '../store/useAuthStore'
import Loading from '../components/Loading';

const ChatPage = () => {
  const { checkAuth, authUser, isCheckingAuth } = useAuthState();

  useEffect(() => {
    checkAuth();
  }, [authUser]);

  if (isCheckingAuth) {
    return <Loading/>;
  }

  return authUser ? (
    <div>Check Auth</div>
  ) : (
    <Navigate to="/login" />
  );
}

export default ChatPage;
