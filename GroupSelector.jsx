import React, { useEffect, useState } from "react";
import { getUserGroups } from "../services/api.js";

const GroupSelector = ({ selectedGroup, setSelectedGroup }) => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const data = await getUserGroups();
        setGroups(data);
      } catch (err) {
        console.error("Failed to load groups", err);
      }
    };
    fetchGroups();
  }, []);

  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold mb-2 text-blue-300 dark:text-blue-200 tracking-wide">
        Select Group
      </label>
      <div className="relative">
        <select
          value={selectedGroup || ""}
          onChange={(e) => setSelectedGroup(e.target.value)}
          className="w-full appearance-none border border-blue-700 dark:border-blue-500 bg-gradient-to-r from-blue-950 via-gray-900 to-indigo-900 dark:from-blue-900 dark:via-gray-900 dark:to-indigo-900 text-white px-4 py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        >
          <option value="" className="text-black dark:text-white bg-white dark:bg-gray-800">Personal</option>
          {groups.map((group) => (
            <option
              key={group.id}
              value={group.id}
              className="text-black dark:text-white bg-white dark:bg-gray-800"
            >
              {group.name}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 dark:text-blue-200 text-lg">
          ▼
        </span>
      </div>
    </div>
  );
};

export default GroupSelector;