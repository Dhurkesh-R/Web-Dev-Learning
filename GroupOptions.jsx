import React, { useState } from 'react'
import GroupSelector from './GroupSelector'
import CreateGroupModal from './CreateGroupModal'
import InviteUserModal from './InviteUserModal'
import { HiUserAdd, HiPlusCircle } from "react-icons/hi";

const GroupOptions = ({ selectedGroup, setSelectedGroup }) => {
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showInviteUser, setShowInviteUser] = useState(false);

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-blue-900/80 via-gray-900/80 to-indigo-900/80 dark:from-blue-900/80 dark:via-gray-900/80 dark:to-indigo-900/80 border border-blue-800 dark:border-blue-700 rounded-xl px-8 py-6 shadow-lg mb-6 transition-all duration-300">
      <div className="flex-1">
        <GroupSelector
          selectedGroup={selectedGroup}
          setSelectedGroup={setSelectedGroup}
        />
      </div>
      <div className="flex gap-3 items-center">
        <button
          onClick={() => setShowCreateGroup(true)}
          className="flex items-center gap-2 text-sm font-semibold px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <HiPlusCircle className="text-lg" />
          Create Group
        </button>
        {selectedGroup && (
          <button
            onClick={() => setShowInviteUser(true)}
            className="flex items-center gap-2 text-sm font-semibold px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <HiUserAdd className="text-lg" />
            Invite User
          </button>
        )}
      </div>
      {showCreateGroup && (
        <CreateGroupModal
          onClose={() => setShowCreateGroup(false)}
          onGroupCreated={() => window.location.reload()} // refresh to see new group
        />
      )}
      {showInviteUser && (
        <InviteUserModal
          groupId={selectedGroup}
          onClose={() => setShowInviteUser(false)}
        />
      )}
    </div>
  )
}

export default GroupOptions
