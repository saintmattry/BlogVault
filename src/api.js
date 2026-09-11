// import axios from 'axios';

// const api = axios.create({
//  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

// // Automatically attach token to every request
// api.interceptors.request.use((config) => {
//   const user = JSON.parse(localStorage.getItem('user') || 'null');
//   if (user?.token) {
//     config.headers.Authorization = `Bearer ${user.token}`;
//   }
//   return config;
// });

// export default api;


import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
console.log("USING API URL:", apiUrl); // check in F12

const api = axios.create({
  baseURL: apiUrl,
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default api;