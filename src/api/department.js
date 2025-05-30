import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000', // Change if backend runs on a different port
});

export const fetchDepartments = () => API.get('/departments');
export const updateDepartment = (id, data) => API.patch(`/departments/${id}`, data);
