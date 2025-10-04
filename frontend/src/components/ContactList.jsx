import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import NoChatFound from './NoChatFound';
import UserLoadingSkeleton from './UserLoadingSkleton';

const ContactList = () => {
  const {getAllContacts,allContacts,setSelectedUser,isUserLoading,selectedUser}= useChatStore();
  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (!allContacts || allContacts?.length === 0) {
    return <NoChatFound />;
  }

  if (isUserLoading) {
    return <UserLoadingSkeleton />;
  }
  return (
    <div className="flex flex-col gap-2">
      {allContacts.map((contact) => {
        const isActive = selectedUser?.id === contact.id;

        return (
          <div
            key={contact.id}
            onClick={() => setSelectedUser(contact)}
            className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer border transition-all duration-300
              ${
                isActive
                  ? "bg-teal-600 text-white border-teal-400 shadow-md"
                  : "bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700/80"
              }`}
          >
            <div className="relative">
              <img
                src={
                  contact.profilePic ||
                  `https://ui-avatars.com/api/?name=${contact.fullName}&background=random&size=64`
                }
                alt={contact.fullName}
                className="w-12 h-12 rounded-full object-cover border border-slate-600"
              />
              {isActive && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-slate-900 rounded-full"></span>
              )}
            </div>

            <h4 className="font-medium truncate">{contact.fullName}</h4>
          </div>
        );
      })}
    </div>
  )
}

export default ContactList