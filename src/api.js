import axios from "axios";

const API_URL = "http://localhost:8080/api/task";

export const fetchTasks = async (page = 0, size = 10, filters = {}) => {
  const response = await axios.get(API_URL, { params: { page, size, ...filters } });
  return response.data;
};

export const createTask = async (task) => {
  const response = await axios.post(API_URL, task);
  return response.data;
};
