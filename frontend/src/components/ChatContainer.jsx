import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import { useAuthState } from '../store/useAuthStore';
import ChatHeader from './ChatHeader';

const ChatContainer = () => {
  const {getMessagesByUserId,selectedUser,messages}= useChatStore();
  const {authUser}= useAuthState();
  useEffect(() => {
    if(selectedUser?._id){
      getMessagesByUserId(selectedUser._id);
    }
  },[selectedUser,getMessagesByUserId]); 
  console.log(selectedUser);
  return (
    <>
    <ChatHeader/>
    </>
  )
}

export default ChatContainer