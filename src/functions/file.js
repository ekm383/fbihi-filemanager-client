import axios from "axios";

export const postUpload = async (formData) =>
  await axios.post(`${process.env.REACT_APP_API}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getAllFiles = async (category) =>
  await axios.post(`${process.env.REACT_APP_API}/getAllFiles`, { category });

export const getAllBenefitsFiles = async (category) =>
  await axios.post(`${process.env.REACT_APP_API}/getAllBenefitsFiles`, {
    category,
  });

export const getDownload = async (id) =>
  await axios.get(`${process.env.REACT_APP_API}/download/${id}`, {
    responseType: "blob",
  });
