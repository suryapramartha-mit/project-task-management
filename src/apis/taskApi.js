import axios from "axios";
import { format } from "date-fns";

const API_URL = import.meta.env.VITE_PROJECT_TASK_MANAGEMENT_API_URL + "/api/task";

export const fetchTasks = async (page = 0, size = 10, filters = {}) => {
  const params = {page, size, ...filters };
  
  if (filters.startDate instanceof Date) {
    params.startDate = format(filters.startDate, 'yyyy-MM-dd');
  }

  if (filters.endDate instanceof Date) {
    params.endDate = format(filters.endDate, 'yyyy-MM-dd');
  }
  const response = await axios.get(API_URL, { params });
  return response.data;
};

export const createTask = async (task) => {
  const response = await axios.post(API_URL, task);
  return response.data;
};
