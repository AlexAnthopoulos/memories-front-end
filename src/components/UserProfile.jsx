import React, { Component, useEffect, useState } from "react";
import { deleteUserLogEntry, listUserLogEntries } from "./API";
const UserProfile = () => {
  const [logEntries, setLogEntries] = useState([]);

  const getEntries = async () => {
    const logEntries = await listUserLogEntries();
    setLogEntries(logEntries);
  };

  useEffect(() => {
    getEntries();
  }, []);

  const deleteMemory = async (memory_id) => {
    await deleteUserLogEntry(memory_id);
    setLogEntries(logEntries.filter((entry) => entry._id !== memory_id));
  };

  return (
    <div className="userProfile">
      <h1 className="memories"> My Memories</h1>

      {logEntries.map((memory) => {
        return (
          <div>
            <h3>{memory.title}</h3>
            <p>{memory.description}</p>
            <img width={400} src={memory.imageUrl} />
            <button onClick={() => deleteMemory(memory._id)}>DELETE</button>
          </div>
        );
      })}
    </div>
  );
};

export default UserProfile;
