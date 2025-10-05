import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import { useAuthState } from '../store/useAuthStore';
import ChatHeader from './ChatHeader';
import NoConversationHistory from './NoConversationHistory';

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
    <div className='flex-1 px-6 overflow-y-auto py-8'>
      {
        messages?.length >0? (
          <p>Some messages</p>
        ):(
          <NoConversationHistory name={selectedUser?.fullName}/>
        )
      }

    </div>
    </>
  )
}

export default ChatContainer