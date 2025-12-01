/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useGroupStore } from "../store/useGroupStore";
import { useChatStore } from "../store/useChatStore";

const GroupList = () => {
  const { groups, fetchAllGroups, createGroup, isCreating, isGroupLoading } =useGroupStore();
    useGroupStore();
  const { getAllContacts, allContacts, setSelectedUser, isUserLoading } =
    useChatStore();

  const [openModal, setOpenModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [step, setStep] = useState(1);
  const [selectedMembers, setSelectedMembers] = useState([]);

  useEffect(() => {
    fetchAllGroups();
    getAllContacts();
  }, []);

  const toggleMember = (user) => {
    if (selectedMembers.some((m) => m._id === user._id)) {
      setSelectedMembers(selectedMembers.filter((m) => m._id !== user._id));
    } else {
      setSelectedMembers([...selectedMembers, user]);
    }
  };

  const handleCreateGroup = async () => {
    if (selectedMembers.length < 2) return alert("Select at least 2 members");

    const payload = {
      name: groupName,
      members: selectedMembers.map((m) => m._id),
    };

    const ok = await createGroup(payload);
    if (ok) {
      setGroupName("");
      setSelectedMembers([]);
      setStep(1);
      setOpenModal(false);
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={() => setOpenModal(true)}
        className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
      >
        + Create New Group
      </button>

      {isGroupLoading && (
        <div className="flex justify-center items-center py-4">
          <svg
            className="w-8 h-8 text-green-600 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
        </div>
      )}

      <div className="space-y-3 mt-2">
        {groups?.map((group) => (
          <div
            key={group._id}
            onClick={() => setSelectedUser(group)}
            className="flex items-center justify-between p-3 bg-white shadow rounded-lg cursor-pointer hover:bg-gray-100"
          >
            <div className="flex items-center space-x-3">
              <img
                src={
                  group.profilePic?.trim()
                    ? group.profilePic
                    : "https://cdn-icons-png.flaticon.com/512/1946/1946429.png"
                }
                alt="Group"
                className="w-12 h-12 rounded-full object-cover border"
              />
              <div>
                <h3 className="font-semibold text-gray-900">{group.name}</h3>
                <p className="text-sm text-gray-500">
                  {group.members?.length} members
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {openModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
            {step === 1 && (
              <>
                <h2 className="text-lg font-semibold mb-3">Group Name</h2>
                <input
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-green-400"
                  placeholder="Enter group name"
                />
                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    type="button"
                    onClick={() => setOpenModal(false)}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!groupName.trim())
                        return alert("Group name required");
                      setStep(2);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Next
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-lg font-semibold mb-3">Select Members</h2>

                {isUserLoading ? (
                   <div className="flex justify-center items-center py-4">
                   <svg
                     className="w-8 h-8 text-green-600 animate-spin"
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                   >
                     <circle
                       className="opacity-25"
                       cx="12"
                       cy="12"
                       r="10"
                       stroke="currentColor"
                       strokeWidth="4"
                     ></circle>
                     <path
                       className="opacity-75"
                       fill="currentColor"
                       d="M4 12a8 8 0 018-8v8H4z"
                     ></path>
                   </svg>
                 </div>
                ) : (
                  <div className="max-h-60 overflow-y-auto space-y-2 border p-2 rounded">
                    {allContacts.map((contact) => (
                      <div
                        key={contact._id}
                        onClick={() => toggleMember(contact)}
                        className={`flex items-center justify-between p-2 rounded cursor-pointer ${
                          selectedMembers.some((m) => m._id === contact._id)
                            ? "bg-green-100"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <img
                            src={
                              contact.profilePic?.trim()
                                ? contact.profilePic
                                : "https://cdn-icons-png.flaticon.com/512/1946/1946429.png"
                            }
                            className="w-6 h-6 rounded-full"
                          />
                          <span>{contact.fullName}</span>
                        </div>
                        {selectedMembers.some((m) => m._id === contact._id) && (
                          <span className="text-green-600 font-semibold">
                            ✓
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleCreateGroup}
                    disabled={isCreating}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-green-400"
                  >
                    {isCreating ? "Creating..." : "Create Group"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupList;
