import axios from "axios";

const API =
  "http://localhost:5000/api/admin";

export const getAllComplaints =
  async () => {
    const response =
      await axios.get(
        `${API}/complaints`
      );

    return response.data;
  };

export const updateComplaintStatus =
  async (id, status) => {
    const response =
      await axios.put(
        `${API}/complaints/${id}`,
        { status }
      );

    return response.data;
  };