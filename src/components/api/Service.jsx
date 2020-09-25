import axios from "axios";
const service = axios.create({
  baseURL: "https://memories-back-end.herokuapp.com/api",
  withCredentials: true,
});

const errorHandler = (err) => {
  throw err;
};

export default {
  service,
  handleUpload(theFile) {
    return service
      .post("/upload", theFile)
      .then((res) => res.data)
      .catch(errorHandler);
  },
  saveNewMemory(newMemory) {
    return service
      .post("/memories", newMemory)
      .then((res) => res.data)
      .catch(errorHandler);
  },
};
