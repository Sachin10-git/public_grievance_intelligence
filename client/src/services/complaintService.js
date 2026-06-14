import axios from "axios";

const API =
  "http://localhost:5000/api/complaints";

const getAuthConfig = () => {
  const token =
    localStorage.getItem("token");

  return {
    headers: {
      Authorization:
        `Bearer ${token}`,
    },
  };
};

export const createComplaint =
  async (complaintData) => {

    const token =
      localStorage.getItem("token");

    const response =
      await axios.post(
        API,
        complaintData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
  };

export const getMyComplaints =
  async () => {

    const response =
      await axios.get(
        `${API}/my`,
        getAuthConfig()
      );

    return response.data;
  };