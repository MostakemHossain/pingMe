import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import UserLoadingSkeleton from './UserLoadingSkleton';
import NoChatFound from './NoChatFound';

const ChatList = () => {
  const {getMyChats,chats,isUserLoading,setSelectedUser}= useChatStore();
  useEffect(() => {
    getMyChats();
  },[getMyChats])
  if(isUserLoading){
    return <UserLoadingSkeleton/>
  }
  if(chats.length === 0){
    return <NoChatFound/>
  }
  return (
    <div>ChatList</div>
  )
}

export default ChatList