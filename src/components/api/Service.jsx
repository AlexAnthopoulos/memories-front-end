import axios from "axios";
const service = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

const errorHandler = (err) => {
  throw err;
};

export default {
    service,
    handleUpload(theFile) {
        return service.post('/upload',theFile)
        .then(res => res.data)
        .catch(errorHandler);
    },
    saveNewMemory (newMemory) {
        return service.post('')
    }
}
