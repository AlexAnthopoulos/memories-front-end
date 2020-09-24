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
          <div className="flip-card image-frame">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <h3>{memory.memoryDate}</h3>
                <img width={400} src={memory.imageUrl} />
              </div>
              <div className="flip-card-back">
                <h3 className="text-capitalize">{memory.title}</h3>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteMemory(memory._id)}
                >
                  DELETE
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserProfile;
