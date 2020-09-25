const API_URL = "https://memories-back-end.herokuapp.com/";

export async function listLogEntries() {
  const response = await fetch(`${API_URL}/api/logs`, {
    credentials: "include",
  });
  return response.json();
}
export async function listUserLogEntries() {
  const response = await fetch(`${API_URL}/api/userlogs`, {
    credentials: "include",
  });
  return response.json();
}

export async function deleteUserLogEntry(_id) {
  const response = await fetch(`${API_URL}/api/userlogs/${_id}`, {
    credentials: "include",
    method: "DELETE",
  });
  return response.json();
}

export async function createLogEntry(entry) {
  const response = await fetch(`${API_URL}/api/logs`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(entry),
  });
  return response.json();
}
