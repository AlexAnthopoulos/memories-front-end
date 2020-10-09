import React, { useState } from "react";
import { useForm } from "react-hook-form";
import service from "../components/api/Service";
import { createLogEntry } from "./API";

const MemoryForm = ({ location, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const [imageUrl, setImageUrl] = useState(null);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      data.latitude = location.latitude;
      data.longitude = location.longitude;
      data.imageUrl = imageUrl;
      await createLogEntry(data);
      onClose();
    } catch (error) {
      
      setError(error.message);
      setLoading(false);
    }
  };

  // this method handles just the file upload
  const handleFileUpload = (e) => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();

    uploadData.append("imageUrl", e.target.files[0]);
    console.log(uploadData);
    service
      .handleUpload(uploadData)
      .then((response) => {
        setImageUrl(response.secure_url);
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
      {error ? <h3 className="error">{error}</h3> : null}
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input name="title" required ref={register} />
      </div>
      <label htmlFor="comments">Comments</label>
      <textarea name="comments" rows={3} required ref={register}></textarea>
      <label htmlFor="description">Description</label>
      <textarea name="description" rows={3} ref={register}></textarea>
      <label htmlFor="imageUrl">Image</label>
      <input
        type="file"
        name="imageUrl"
        required
        ref={register}
        onChange={(e) => handleFileUpload(e)}
      />
      <label htmlFor="memoryDate">Memory Date</label>
      <input name="memoryDate" type="date" required ref={register} />
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? "Loading..." : "Create Memory"}
      </button>
    </form>
  );
};

export default MemoryForm;
